import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import config from '../../config';
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExist(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is blocked');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Passward is not corrected');
  }

  const JwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(JwtPayload, config.JWT_SECRET_TOKEN as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
};
