import { z } from 'zod';
const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  role: z.enum(['admin', 'user']).optional(),
  isBlocked: z.boolean().optional(),
});
export const userValidation = {
  userSchema,
};
