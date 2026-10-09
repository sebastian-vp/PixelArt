import type { CreateDrawingDto, UpdateDrawingDto } from "#src/dtos/drawings";
import { Drawing } from "#src/models/drawing.model";
import { User } from "#src/models/user.model";
import { InvalidInputError, NotFoundError } from "#src/utils/errors";

export const listDrawings = async () => {
  return Drawing.find({});
};

export const getDrawing = async (id: string) => {
  const drawing = await Drawing.findById(id);

  if (!drawing) {
    throw new NotFoundError("Drawing not found");
  }

  return drawing;
};

export const createDrawing = async (fields: CreateDrawingDto) => {
  const drawing = new Drawing(fields);
  await drawing.validate();

  if (!(await User.exists({ _id: drawing.userId }))) {
    throw new InvalidInputError("User not found");
  }

  return drawing.save();
};

export const updateDrawing = async (id: string, fields: UpdateDrawingDto) => {
  const drawing = await getDrawing(id);

  if (fields.title !== undefined) drawing.title = fields.title;
  if (fields.width !== undefined) drawing.width = fields.width;
  if (fields.height !== undefined) drawing.height = fields.height;
  if (fields.pixels !== undefined) drawing.pixels = fields.pixels;
  if (fields.isFavorite !== undefined) drawing.isFavorite = fields.isFavorite;

  await drawing.validate();

  return drawing.save();
};

export const deleteDrawing = async (id: string) => {
  const drawing = await Drawing.findByIdAndDelete(id);

  if (!drawing) {
    throw new NotFoundError("Drawing not found");
  }
};
