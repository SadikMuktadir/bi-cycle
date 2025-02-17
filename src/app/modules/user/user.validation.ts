import { z } from 'zod';
const userSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']).optional(),
  isBlocked: z.boolean().optional(),
});
export const userValidation = {
  userSchema,
};
