import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      // select: 0,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email });
};
userSchema.statics.isPasswordMatched = async function (
  plainText,
  hashPassword,
) {
  return await bcrypt.compare(plainText, hashPassword);
};
const User = model<IUser, UserModel>('User', userSchema);
export default User;
