import {Router} from 'express';

import * as ProductController from './product.controller';

const routes = new Router();

routes.post('/create',ProductController.create);

export default routes;
