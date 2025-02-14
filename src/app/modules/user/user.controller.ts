import { Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createUser = async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userServices.createUser(payload);

  const responseData = {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: responseData,
  });
};
const getUser = async (req: Request, res: Response) => {
  const result = await userServices.getUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived successfully',
    data: result,
  });
};
const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await userServices.getSingleUser(userId);
  if (!result) {
    res.status(404).send({
      success: false,
      message: 'User not found',
    });
    return;
  }
  res.send({
    success: true,
    message: 'Single User retrieved successfully',
    data: result,
  });
};
const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body;
  const result = await userServices.updateUser(userId, body);
  if (!result) {
    res.status(404).send({
      success: false,
      message: 'User not found to update',
    });
    return;
  }
  res.send({
    success: true,
    message: 'User updated successfully',
    data: result,
  });
};
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await userServices.deleteUser(userId);
  res.send({
    success: true,
    message: 'User deleted successfully',
  });
};
export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
