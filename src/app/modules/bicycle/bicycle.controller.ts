/* eslint-disable no-console */
import { Request, Response } from 'express';
import { bicycleService } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await bicycleService.createBicycle(payload);
    res.status(201).send({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error creating bicycle:', error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while creating the bicycle',
      error: error,
    });
  }
};
const getBicycle = async (req: Request, res: Response) => {
  try {
    const result = await bicycleService.getBicycle(req.query);
    res.send({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error retrieving bicycles:', error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while retrieving bicycles',
      error: error,
    });
  }
};
const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await bicycleService.getSingleBicycle(productId);
    if (!result) {
      res.status(404).send({
        success: false,
        message: 'Bicycle not found',
      });
      return;
    }
    res.send({
      success: true,
      message: 'Single Bicycle retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error retrieving single bicycle:', error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while retrieving the bicycle',
      error: error,
    });
  }
};
const updateBicycle = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await bicycleService.updateBicycle(productId, body);
    if (!result) {
      res.status(404).send({
        success: false,
        message: 'Bicycle not found to update',
      });
      return;
    }
    res.send({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error updating bicycle:', error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while updating the bicycle',
      error: error,
    });
  }
};
const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await bicycleService.deleteBicycle(productId);
    res.send({
      success: true,
      message: 'Bicycle deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting bicycle:', error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while deleting the bicycle',
      error: error,
    });
  }
};
export const bicycleController = {
  createBicycle,
  getBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
