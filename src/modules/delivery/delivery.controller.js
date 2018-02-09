import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { Authorization } from '../../helpers/Authorization';
import { QueryFilters } from '../../helpers/QueryFilters'
import Delivery from './delivery.model';


export async function create(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        req.body['Status'] = 'New'

        var createRes = await Delivery.create(req.body);

        result.message = 'Successfully created record';
        result.successful = true;
        result.model = createRes;

        return res.status(200).json(result);
    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = req.body;

        return res.status(500).json(result);
    }
}

export async function update(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.UpdatedBy = authenticationRes.model.Name;
            req.body.DateUpdated = new Date();
        }

        var updateRes = await Delivery.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });

        result.message = 'Successfully updated record';
        result.successful = true;
        result.model = updateRes;

        return res.status(200).json(result);
    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = req.body;

        return res.status(500).json(result);
    }
}

export async function remove(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null || id === undefined) {
            result.message = 'Id is required';
            result.successful = false;
            result.model = null;

            return res.status(400).json(result);
        }

        await Delivery.findOneAndRemove({ _id: id });

        result.message = 'Successfully deleted record';
        result.successful = true;
        result.model = null;

        return res.status(200).json(result);

    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = null;

        return res.status(500).json(result);
    }
}

export async function getById(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null || id === undefined) {
            result.message = 'Id is required';
            result.successful = false;
            result.model = null;

            return res.status(400).json(result);
        }

        var itemRes = await Delivery.findOne({ _id: id });

        result.message = 'Successfully retreive record';
        result.successful = true;
        result.model = itemRes;

        return res.status(200).json(result);
    } catch (e) {
        result.message = e.errmsg;
        result.successful = false;
        result.model = null;

        return res.status(500).json(result);
    }
}

export async function search(req, res) {
    var result = new SearchResult();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.model = req.body;
            result.message = authenticationRes.message;
            result.successful = false;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        if (req.query.limit === null || req.query.limit === undefined) {
            req.query.limit = 20;
        }
        var filters = {}
        if (req.query.Filters != null) {
            filters = QueryFilters(req.query.Filters, req.body.Context);
        } else {
            filters["Context"] = req.body.Context;
        }

        var searchItemRes = await Delivery.find(filters);

        var totalcount = searchItemRes.length;
        var pages = Math.ceil(searchItemRes.length / req.query.limit);

        var finalItemRes = await Delivery.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

        result.items = finalItemRes;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Successfully retreive records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}