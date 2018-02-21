import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { Authorization } from '../../helpers/Authorization';
import { QueryFilters } from '../../helpers/QueryFilters'
import PurchaseOrder from './purchaseorder.model';


export async function create(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }
        var purchaseOrderItem = await PurchaseOrder.find({ QuotationId: req.body.QuotationId })

        if (purchaseOrderItem > 0) {
            result.successful = false;
            result.model = req.body;
            result.message = 'Quotation has been already purchased';

            return res.status(400).json(result);
        }

        req.body['Status'] = 'New';

        var purchaseOrderNo = new Date().getYear() + '-' + Math.round((new Date()).getTime() / 1000);

        req.body['PurchaseOrderNo'] = purchaseOrderNo;

        var createRes = await PurchaseOrder.create(req.body);

        result.successful = true;
        result.model = createRes;
        result.message = 'Successfully created record';

        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function update(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.DateUpdated = new Date();
            req.body.UpdatedBy = authenticationRes.model.Name;
        }

        var updateRes = await PurchaseOrder.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });

        result.successful = true;
        result.model = updateRes;
        result.message = 'Successfully updated record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function remove(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === null || id === undefined) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';

            return res.status(400).json(result);
        }

        await PurchaseOrder.findOneAndRemove({ _id: id });

        result.successful = true;
        result.model = null;
        result.message = 'Successfully remove record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function getById(req, res) {
    var result = new Result();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var id = req.params.id;

        if (id === undefined || id === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';

            return res.status(400).json(result);
        }

        var itemRes = await PurchaseOrder.findOne({ _id: id });

        result.successful = true;
        result.model = itemRes;
        result.message = 'Successfully retrieve record';

        return res.status(200).json(result);
    } catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;

        return res.status(500).json(result);
    }
}

export async function searchAll(req, res) {
    var result = new SearchResult();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        } else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }

        var itemsRes = await PurchaseOrder.find({ Context: req.body.Context });

        result.items = itemRes;
        result.totalcount = itemRes.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 1;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

export async function search(req, res) {
    var result = new SearchResult();

    try {
        var authenticationRes = await Authorization(req.headers.authorization);

        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
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

        var itemRes = await PurchaseOrder.find(filters);
        console.log(itemRes)
        var totalcount = itemRes.length;
        var pages = Math.ceil(itemRes.length / req.query.limit);

        var finalItemRes = await PurchaseOrder.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

        result.items = finalItemRes;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Successfully retrieve records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 1;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}

export async function getByUserIdNew(req, res) {
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

        var searchItem = await PurchaseOrder.find({ Context: req.body.Context, UserId: req.params.id, Status: { $ne: 'Completed' } })

        result.items = searchItem;
        result.totalcount = searchItem.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;

        return res.status(200).json(result);
    } catch (e) {
        result.items = null;
        result.totalcount = null;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;

        return res.status(500).json(result);
    }
}