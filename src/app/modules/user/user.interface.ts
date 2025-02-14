import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  _id?: unknown;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  isPasswordMatched(plainText: string, hashPassword: string): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
