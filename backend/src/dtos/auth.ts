import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const sessionSchema = z.object({
  id: z.string().regex(/^[a-fA-F0-9]{24}$/),
  csrf: z.string().min(1),
  exp: z.number(),
});
