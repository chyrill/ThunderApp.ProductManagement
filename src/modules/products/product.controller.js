import Product from './product.model';
import {Authorization} from '../../helpers/Authorization';
import Result from  '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import {QueryFilters} from '../../helpers/QueryFilters';

export async function create(req,res) {
  var response = new Result();
  try{

    var authRes =await Authorization(req.headers.authorization);

    if (authRes.successful!=true){
      response.model = req.body;
      response.message = authRes.message;
      response.successful = false;
      return res.status(401).json(response);
    }
    else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    var productFind = await Product.find({Name:req.body.Name});

    if(productFind>1){
      response.model = req.body;
      response.message = "Product already existed";
      response.successful = false;
      return res.status(400).json(response);
    }

    const product = await Product.create(req.body);

    response.model = product;
    response.message = "Successfully created product";
    response.successful = true;

    return res.status(201).json(response);
  }
  catch (e){
    response.model = req.body;
    response.message = e.errmsg;
    response.successful = false;
    return res.status(500).json(response);
  }
}

export async function getAll(req,res){
  var result = new SearchResult();

  try{
    var authRes =await Authorization(req.headers.authorization);

    if (authRes.successful!=true){
      result.items = null;
      result.message = authRes.message;
      result.successful = false;
      console.log(response);
      return res.status(401).json(result);
    }
    else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    var productsItemsRes  = await Product.find({Context:req.body.Context});

    if (productsItemsRes.length<1){
      result.items = null;
      result.message = "Product record not found";
      result.successful = false;
      return res.status(200).json(result);
    }

    var count = productsItemsRes.count;

    result.items = productsItemsRes;
    result.totalcount = count;
    result.pages = 0;
    result.successful = true;
    result.message="Successfully retrieve data";

    return res.status(200).json(result);

  }
  catch (e){
    result.items = null;
    result.message = e.errmsg;
    result.successful = false;
    return res.status(500).json(result);
  }
}

export async function getById(req,res){

  var result = new Result();

  try{

    var authRes =await Authorization(req.headers.authorization);

    if (authRes.successful!=true){
      result.model = null;
      result.message = authRes.message;
      result.successful = false;
      console.log(response);
      return res.status(401).json(result);
    }
    else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    var id = req.params.id;

    if (id === null){
      result.model = null;
      result.message = "Id is required";
      result.successful = false;

      return res.status(404).json(result);
    }

    var productRes = await Product.findOne({_id:id,Context:req.body.Context});

    if(productRes===null){
      result.model = null;
      result.message = "Item not found";
      result.successful = false;

      return res.status(400).json(result);
    }

    result.model = productRes;
    result.message = "Product found";
    result.successful = true;

    return res.status(200).json(result);

  }
  catch (e){
    result.model = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

export async function remove(req,res){

  var result = new Result();

  try{
      var id = req.params.id;

      if (id===null){
        result.model = null;
        result.message = "Id is required";
        result.successful = false;

        return res.status(400).json(result);
      }

      var authRes =await Authorization(req.headers.authorization);

      if (authRes.successful!=true){
        result.model = null;
        result.message = authRes.message;
        result.successful = false;
        console.log(response);
        return res.status(401).json(result);
      }
      else {
        req.body.Context = authRes.model.Context;
        req.body.CreatedBy = authRes.model.Name;
      }

      await Product.findOneAndRemove({_id:id,Context:req.body.Context});

      result.model = null;
      result.message = "Successfully deleted record";
      result.successful = true;

      return res.status(200).json(result);
  }
  catch (e){
    result.model = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

export async function update(req,res){

  var result = new Result();

  try{
    var authRes =await Authorization(req.headers.authorization);

    if (authRes.successful!=true){
      result.model = req.body;
      result.message = authRes.message;
      result.successful = false;

      return res.status(401).json(result);
    }
    else {
      req.body.Context = authRes.model.Context;
      req.body.UpdatedBy = authRes.model.Name;
      req.body.DateUpdated = new Date();
    }

    var productUpdateRes = await Product.findOneAndUpdate({_id:req.body.id},req.body,{Upsert:true,strict:false});

    result.model = productUpdateRes;
    result.message = "Successfully updated record";
    result.successful = true;

    return res.status(200).json(result);
  }
  catch (e){
    result.model = req.body;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}

export async function search(req,res){

  var result = new SearchResult();

  try{
    var authRes =await Authorization(req.headers.authorization);

    if (authRes.successful!=true){
      result.items = null;
      result.message = authRes.message;
      result.successful = false;

      return res.status(401).json(result);
    }
    else {
      req.body.Context = authRes.model.Context;
      req.body.CreatedBy = authRes.model.Name;
    }

    if (req.query.limit === null || req.query.limit === undefined) {
      req.query.limit = 20;
    }
    var filters = {}
    if(req.query.Filters != null){
         filters = QueryFilters (req.query.Filters,req.body.Context);
    }
    else {
      filters["Context"] = req.body.Context;
    }

    var allProduct = await Product.find(filters);

    var pages = Math.ceil(allProduct.length/req.query.limit);
    var totalcount = allProduct.length;
    var productRes = await Product.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);

    if (productRes.length < 1) {
      result.items = productRes;
      result.message = "Item not found";
      result.successful = false;

      return res.status(400).json(result);
    }



    result.items = productRes;
    result.pages = pages;
    result.totalcount = totalcount;
    result.message = "Successfully retrieve list of items";
    result.successful = true;

    return res.status(200).json(result);
  }
  catch (e){
    console.log(e);
    result.items = null;
    result.message = e.errmsg;
    result.successful = false;

    return res.status(500).json(result);
  }
}
