import { z } from "zod";

const nonEmptyText = z.string().refine((value) => value.trim().length > 0);

export const createUserSchema = z.object({
  name: nonEmptyText,
  email: nonEmptyText,
  password: nonEmptyText,
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
