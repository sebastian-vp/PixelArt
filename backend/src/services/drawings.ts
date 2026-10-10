import type { CreateDrawingDto, UpdateDrawingDto } from "#src/dtos/drawings";
import { Drawing } from "#src/models/drawing.model";
import { NotFoundError } from "#src/utils/errors";

export const listDrawings = async (userId: string) => {
  return Drawing.find({ userId });
};

export const getDrawing = async (id: string, userId: string) => {
  const drawing = await Drawing.findOne({ _id: id, userId });

  if (!drawing) {
    throw new NotFoundError("Drawing not found");
  }

  return drawing;
};

export const createDrawing = async (fields: CreateDrawingDto, userId: string) => {
  const drawing = new Drawing({ ...fields, userId });
  await drawing.validate();

  return drawing.save();
};

export const updateDrawing = async (id: string, fields: UpdateDrawingDto, userId: string) => {
  const drawing = await getDrawing(id, userId);

  if (fields.title !== undefined) drawing.title = fields.title;
  if (fields.width !== undefined) drawing.width = fields.width;
  if (fields.height !== undefined) drawing.height = fields.height;
  if (fields.pixels !== undefined) drawing.pixels = fields.pixels;
  if (fields.isFavorite !== undefined) drawing.isFavorite = fields.isFavorite;

  await drawing.validate();

  return drawing.save();
};

export const deleteDrawing = async (id: string, userId: string) => {
  const drawing = await getDrawing(id, userId);

  await drawing.deleteOne();
};
