import bcrypt from "bcrypt";

import { User } from "#src/models/user.model";
import { NotFoundError } from "#src/utils/errors";
import type { CreateUserDto, UpdateUserDto } from "#src/dtos/users";

export const listUsers = async () => {
  return User.find({});
};

export const getUser = async (id: string) => {
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

export const updateUser = async (id: string, fields: UpdateUserDto) => {
  const { name, email, password } = fields;

  const user = await getUser(id);

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (password !== undefined) user.passwordHash = await bcrypt.hash(password, 10);

  return user.save();
};

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }
};
