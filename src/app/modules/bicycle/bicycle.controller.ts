import { Request, Response } from "express";
import { bicycleService } from "./bicycle.service";

const createBicycle = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await bicycleService.createUser(payload);
    res.send({
      success: true,
      message: "Bicycle created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getBicycle = async (req: Request, res: Response) => {
  try {
    const result = await bicycleService.getBicycle();
    res.send({
      success: true,
      message: "Bicycles retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleId = req.params.bicycleId;
    const result = await bicycleService.getSingleBicycle(bicycleId);
    res.send({
      success: true,
      message: "Single Bicycles retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleId = req.params.bicycleId;
    await bicycleService.deleteBicycle(bicycleId);
    res.send({
      success: true,
      message: "Bicycles deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export const bicycleController = {
  createBicycle,
  getBicycle,
  getSingleBicycle,
  deleteBicycle,
};
