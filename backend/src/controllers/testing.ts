import type { RequestHandler } from "express";

import { Drawing } from "#src/models/drawing.model";
import { User } from "#src/models/user.model";

export const reset: RequestHandler = async (_request, response) => {
  await Drawing.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
};
