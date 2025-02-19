import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import config from '../../config';
import bcrypt from 'bcrypt';
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
  const accessToken = jwt.sign(JwtPayload, config.JWT_ACCESS_TOKEN as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: {
    email: string;
    oldPassword: string;
    newPassword: string;
  },
) => {
  const user = await User.isUserExist(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
  }

  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData?.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
