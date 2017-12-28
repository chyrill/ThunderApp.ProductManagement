import {Router} from 'express';

import * as ProductController from './product.controller';

const routes = new Router();

routes.post('',ProductController.create);
routes.delete('/:id',ProductController.remove);
routes.put('',ProductController.update);
routes.get('/:id',ProductController.getById);
routes.get('',ProductController.search);
routes.get('/all',ProductController.getAll);

export default routes;
