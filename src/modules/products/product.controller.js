import Product from './product.model';
import {Authorization} from '../../helpers/Authorization';
import Result from  '../../helpers/Result';

export async function create(req,res) {
  var response = new Result();
  try{

    var authRes =await Authorization(req.headers.authorization);

    if (authRes.successful!=true){
      response.model = req.body;
      response.message = authRes.message;
      response.successful = false;
      console.log(response);
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
  try{

  }
  catch (e){
    return res.status(500).json(e);
  }
}
