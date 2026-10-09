import type { RequestHandler } from "express";

import * as usersService from "#src/services/users";
import { createUserSchema, updateUserSchema } from "#src/dtos/users";

export const listUsers: RequestHandler = async (_request, response) => {
  const users = await usersService.listUsers();

  response.json(users);
};

export const getUser: RequestHandler<{ id: string }> = async (request, response) => {
  const user = await usersService.getUser(request.params.id);

  response.json(user);
};

export const createUser: RequestHandler = async (request, response) => {
  const fields = createUserSchema.parse(request.body);
  const user = await usersService.createUser(fields);

  response.status(201).json(user);
};

export const updateUser: RequestHandler<{ id: string }> = async (request, response) => {
  const fields = updateUserSchema.parse(request.body);
  const user = await usersService.updateUser(request.params.id, fields);

  response.json(user);
};

export const deleteUser: RequestHandler<{ id: string }> = async (request, response) => {
  await usersService.deleteUser(request.params.id);

  response.status(204).end();
};
