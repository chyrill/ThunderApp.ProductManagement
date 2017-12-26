import Product from './product.model';


export async function add(req,res) {
  try{
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  }
  catch (e){
    return res.status(500).json(e);
  }
}
