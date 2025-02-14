import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();
bicycleRouter.post('/', bicycleController.createBicycle);
bicycleRouter.get('/', bicycleController.getBicycle);
bicycleRouter.get('/:productId', bicycleController.getSingleBicycle);
bicycleRouter.patch('/:productId', bicycleController.updateBicycle);
bicycleRouter.delete('/:productId', bicycleController.deleteBicycle);
export default bicycleRouter;
