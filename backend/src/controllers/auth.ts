import type { RequestHandler } from "express";

import { loginSchema } from "#src/dtos/auth";
import * as authService from "#src/services/auth";

export const login: RequestHandler = async (request, response) => {
  const fields = loginSchema.parse(request.body);
  const session = await authService.login(fields);

  response.cookie("token", session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api",
    maxAge: 60 * 60 * 1000,
  });
  response.setHeader("X-CSRF-Token", session.csrf);
  response.json(session.user);
};

export const me: RequestHandler = async (request, response) => {
  const token: unknown = request.cookies?.token;
  const session = await authService.getSession(token);

  response.setHeader("X-CSRF-Token", session.csrf);
  response.json(session.user);
};
