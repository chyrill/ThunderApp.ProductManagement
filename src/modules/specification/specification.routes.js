import { Router } from 'express';
import * as SpecificationController from './specification.controller';

const routes = new Router();

routes.post('', SpecificationController.create);
routes.get('/:Name', SpecificationController.getByName);
routes.get('', SpecificationController.searchAll);
routes.delete('/:id', SpecificationController.remove);

export default routes;