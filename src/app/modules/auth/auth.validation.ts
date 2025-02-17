import { z } from 'zod';
const loginValidationSchema = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old password is required',
  }),
  newPassword: z.string({ required_error: 'Password is required' }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
