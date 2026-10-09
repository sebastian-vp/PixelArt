import type { RequestHandler } from "express";

import * as drawingsService from "#src/services/drawings";
import { createDrawingSchema, updateDrawingSchema } from "#src/dtos/drawings";

export const listDrawings: RequestHandler = async (_request, response) => {
  const drawings = await drawingsService.listDrawings();

  response.json(drawings);
};

export const getDrawing: RequestHandler<{ id: string }> = async (request, response) => {
  const drawing = await drawingsService.getDrawing(request.params.id);

  response.json(drawing);
};

export const createDrawing: RequestHandler = async (request, response) => {
  const fields = createDrawingSchema.parse(request.body);
  const drawing = await drawingsService.createDrawing(fields);

  response.status(201).json(drawing);
};

export const updateDrawing: RequestHandler<{ id: string }> = async (request, response) => {
  const fields = updateDrawingSchema.parse(request.body);
  const drawing = await drawingsService.updateDrawing(request.params.id, fields);

  response.json(drawing);
};

export const deleteDrawing: RequestHandler<{ id: string }> = async (request, response) => {
  await drawingsService.deleteDrawing(request.params.id);

  response.status(204).end();
};
