import productRoutes from './products/product.routes';
import categoryRoutes from './categories/categories.routes';
import specificationRoutes from './specification/specification.routes';
import purchaseOrderRoutes from './purchaseorder/purchaseorder.routes';
import deliveryRoutes from './delivery/delivery.routes';

export default app => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "*");
        next();
    });
    app.use('/api/v1/products', productRoutes);
    app.use('/api/v1/category', categoryRoutes);
    app.use('/api/v1/specification', specificationRoutes);
    app.use('/api/v1/purchaseorder', purchaseOrderRoutes);
    app.use('/api/v1/delivery', deliveryRoutes);
};