import bcrypt from "bcrypt";

import { User } from "#src/models/user.model";
import { ForbiddenError, NotFoundError } from "#src/utils/errors";
import type { CreateUserDto, UpdateUserDto } from "#src/dtos/users";

export const listUsers = async (userId: string) => {
  return User.find({ _id: userId });
};

export const getUser = async (id: string, userId: string) => {
  if (id !== userId) {
    throw new ForbiddenError("Access denied");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const createUser = async (fields: CreateUserDto) => {
  const { name, email, password } = fields;

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash });

  return user.save();
};

export const updateUser = async (id: string, fields: UpdateUserDto, userId: string) => {
  const { name, email, password } = fields;

  const user = await getUser(id, userId);

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (password !== undefined) user.passwordHash = await bcrypt.hash(password, 10);

  return user.save();
};

export const deleteUser = async (id: string, userId: string) => {
  const user = await getUser(id, userId);

  await user.deleteOne();
};
