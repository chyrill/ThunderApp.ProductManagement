import {Router} from 'express';
import * as categoryController from './categories.controller';


const routes = new Router();

routes.post('',categoryController.create);
routes.get('',categoryController.getAll);

export default routes;
