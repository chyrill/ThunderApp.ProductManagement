import Specifications from './specification.model';
import { Authorization } from '../../helpers/Authorization';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { QueryFilters } from '../../helpers/QueryFilters';
import Product from '../products/product.model';

export async function create(req, res) {
    var result = new Result();

    try {
        var authenticationResult = await Authorization(req.headers.authorization);

        if (authenticationResult.successful != true) {
            result.model = req.body;
            result.message = authenticationResult.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationResult.model.Context;
            req.body.CreatedBy = authenticationResult.model.Name;
        }

        if (req.body.SpecificationItem.length <= 0) {
            result.successful = false;
            result.model = req.body;
            result.message = 'Specifications item must not be null';

            return res.status(400).json(result);
        }

        var createres = await Specifications.create(req.body);

        result.successful = true;
        result.model = createres;
        result.message = 'Successfully added record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function getByName(req, res) {
    var result = new Result();

    try {
        var authenticationResult = await Authorization(req.headers.authorization);

        if (authenticationResult.successful != true) {
            result.model = req.body;
            result.message = authenticationResult.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationResult.model.Context;
            req.body.CreatedBy = authenticationResult.model.Name;
        }

        var Name = req.params.Name;

        if (Name === null || Name === undefined) {
            result.successful = false;
            result.model = null;
            result.message = 'Name is required';

            return res.status(400).json(result);
        }

        var specres = await Specifications.findOne({ Category: Name });
        console.log(specres)
        result.successful = true;
        result.model = specres;
        result.message = 'Successfully retrieve record';

        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function searchAll(req, res) {
    var result = new SearchResult();

    try {
        var authenticationResult = await Authorization(req.headers.authorization);

        if (authenticationResult.successful != true) {
            result.model = req.body;
            result.message = authenticationResult.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationResult.model.Context;
            req.body.CreatedBy = authenticationResult.model.Name;
        }

        var specItems = await Specifications.find({ Context: req.body.Context });

        result.successful = true;
        result.items = specItems;
        result.totalcount = specItems.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.items = null;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function remove(req, res) {
    var result = new Result();

    try {
        var authenticationResult = await Authorization(req.headers.authorization);

        if (authenticationResult.successful != true) {
            result.model = req.body;
            result.message = authenticationResult.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationResult.model.Context;
            req.body.CreatedBy = authenticationResult.model.Name;
        }

        var id = req.params.id;

        if (id === null || id === undefined) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';

            return res.status(400).json(result);
        }

        var check = await ifInUse(req.body.Category, req.body.Context);

        if (check.successful) {
            result.successful = false;
            result.model = null;
            result.message = check.message;

            return res.status(400).json(result);
        }

        await Specifications.findOneAndRemove({ _id: id })

        result.successful = true;
        result.model = null;
        result.message = 'Successfully removed record';

        return res.status(200).json(result);


    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function ifInUse(value, context) {
    var result = new Result();
    try {
        var productRes = await Product.find({ Category: value, Context: context })

        if (productRes.length > 0) {
            result.successful = true;
            result.model = null;
            result.message = 'Specification is in use';

            return result;
        }

        result.successful = false;
        result.model = null;
        result.message = 'Not in use';

        return result;
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = 'Not in use';

        return result;
    }
}