import productRoutes from './products/product.routes';

export default app =>{
  app.use('./api/v1/products',productRoutes);
};
