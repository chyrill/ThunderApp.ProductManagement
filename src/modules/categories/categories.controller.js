import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { Authorization } from '../../helpers/Authorization';
import Category from './categories.model';
import Product from '../products/product.model';

export async function create(req, res) {

    var result = new Result();

    try {

        var authRes = await Authorization(req.headers.authorization);

        if (authRes.successful != true) {
            result.model = req.body;
            result.message = authRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authRes.model.Context;
            req.body.CreatedBy = authRes.model.Name;
        }

        var searchCategoryRes = await Category.find({ Name: req.body.Name });

        if (searchCategoryRes.length > 0) {
            result.model = req.body;
            result.message = "Category already Existed";
            result.successful = false

            return res.status(400).json(result);
        }

        var categoryRes = await Category.create(req.body);

        result.model = categoryRes;
        result.message = "Successfully created category";
        result.successful = true

        return res.status(200).json(result);

    } catch (e) {
        result.model = req.body;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

export async function getAll(req, res) {
    var result = new SearchResult();

    try {

        var searchRes = await Category.find({ Context: req.query.Context });

        result.items = searchRes;
        result.pages = 1;
        result.totalcount = searchRes.length;
        result.message = 'Successfully retrieve data';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = null;
        result.pages = 0;
        result.totalcount = 0;
        result.message = e.errmsg;
        result.successful = false;

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

        if (id === null && id === undefined) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';

            return res.status(400).json(result);
        }

        var categoryRes = await Category.findOne({ _id: id });

        var checkIfUse = await checkIfNotInUse(categoryRes.Name, req.body.Context);
        if (!checkIfUse.successful) {
            result.successful = false;
            result.model = null;
            result.message = checkIfNotInUse.message;

            return res.status(400).json(result);
        }

        await Category.findOneAndRemove({ _id: id });

        result.successful = true;
        result.model = null;
        result.message = 'Successfully deleted record';

        return res.status(200).json(result);

    } catch (e) {
        console.log(e);
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

async function checkIfNotInUse(value, context) {
    var result = new Result();

    try {
        var productRes = await Product.find({ Category: value, Context: context });

        if (productRes.length > 0) {
            result.successful = false;
            result.model = null;
            result.message = 'Category in use';

            return result;
        }

        result.successful = true;
        result.model = null;
        result.message = 'Category not in use';

        return result;
    } catch (e) {
        result.successful = true;
        result.model = null;
        result.message = 'Category not in use';

        return result;
    }
}