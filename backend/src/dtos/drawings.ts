import { z } from "zod";

export const createDrawingSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  title: z.string().optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  pixels: z.array(
    z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .nullable(),
  ),
  isFavorite: z.boolean().optional(),
});

export const updateDrawingSchema = createDrawingSchema.omit({ userId: true }).partial();

export type CreateDrawingDto = z.infer<typeof createDrawingSchema>;
export type UpdateDrawingDto = z.infer<typeof updateDrawingSchema>;
