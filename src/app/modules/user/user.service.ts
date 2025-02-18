import config from '../../config';
import { IUser } from './user.interface';
import User from './user.model';
import jwt from 'jsonwebtoken';
const createUser = async (
  payload: IUser,
): Promise<{ user: IUser; token: string }> => {
  const user = await User.create(payload);
  const JwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(JwtPayload, config.JWT_ACCESS_TOKEN as string, {
    expiresIn: '10d',
  });

  return {
    user,
    token: accessToken,
  };
};

const getUser = async () => {
  const result = await User.find();
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
export const userServices = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
