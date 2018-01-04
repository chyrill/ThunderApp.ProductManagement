import productRoutes from './products/product.routes';
import categoryRoutes from './categories/categories.routes';

export default app =>{
  app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  app.use('/api/v1/products',productRoutes);
  app.use('/api/v1/category',categoryRoutes);
};
