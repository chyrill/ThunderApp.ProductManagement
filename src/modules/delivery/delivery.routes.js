import { Router } from 'express';
import * as DeliveryController from './delivery.controller';

const routes = new Router();

routes.post('', DeliveryController.create);
routes.put('', DeliveryController.update);
routes.delete('/:id', DeliveryController.remove);
routes.get('', DeliveryController.search);
routes.get('/:id', DeliveryController.getById);

export default routes;