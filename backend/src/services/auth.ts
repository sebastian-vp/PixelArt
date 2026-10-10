import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

import type { LoginDto } from "#src/dtos/auth";
import { User } from "#src/models/user.model";
import { UnauthorizedError } from "#src/utils/errors";

export const login = async (fields: LoginDto) => {
  const user = await User.findOne({ email: fields.email });
  const passwordCorrect = user ? await bcrypt.compare(fields.password, user.passwordHash) : false;

  if (!user || !passwordCorrect) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  const csrf = randomUUID();
  const token = jwt.sign({ email: user.email, id: user._id.toString(), csrf }, secret, {
    expiresIn: 60 * 60,
  });

  return { user, token, csrf };
};
