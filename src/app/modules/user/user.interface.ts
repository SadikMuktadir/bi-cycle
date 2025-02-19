/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  [x: string]: any;
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

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
}
import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  name: string; // Add any other user-specific properties as needed
  role: 'admin' | 'user';
}

export type TUserRole = keyof typeof USER_ROLE;
type TUserModel = Model<IUser, {}, IUserMethods>;

export default TUserModel;
