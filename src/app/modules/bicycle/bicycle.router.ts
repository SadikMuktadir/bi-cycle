import { Router } from "express";
import { bicycleController } from "./bicycle.controller";

const bicycleRouter = Router();
bicycleRouter.post("/products", bicycleController.createBicycle);
bicycleRouter.get("/products", bicycleController.getBicycle);
bicycleRouter.get("/products/:productId", bicycleController.getSingleBicycle);
bicycleRouter.patch("/products/:productId", bicycleController.updateBicycle);
bicycleRouter.delete("/products/:productId", bicycleController.deleteBicycle);
export default bicycleRouter;
