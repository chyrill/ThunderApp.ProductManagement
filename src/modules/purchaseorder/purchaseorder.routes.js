import { Router } from 'express';
import * as PurchaseOrderController from './purchaseorder.controller';

const routes = new Router();

routes.post('', PurchaseOrderController.create);
routes.get('/:id', PurchaseOrderController.getById);
routes.get('/all', PurchaseOrderController.searchAll);
routes.get('', PurchaseOrderController.search);
routes.put('', PurchaseOrderController.update);
routes.delete('/:id', PurchaseOrderController.remove);

export default routes;