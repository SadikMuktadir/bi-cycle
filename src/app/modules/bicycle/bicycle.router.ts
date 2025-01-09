import { Router } from "express";
import { bicycleController } from "./bicycle.controller";

const bicycleRouter = Router();
bicycleRouter.post("/products", bicycleController.createBicycle);
bicycleRouter.get("/products", bicycleController.getBicycle);
export default bicycleRouter;
