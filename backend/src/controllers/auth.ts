import type { RequestHandler } from "express";

import { loginSchema } from "#src/dtos/auth";
import * as authService from "#src/services/auth";
import { ForbiddenError } from "#src/utils/errors";

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

export const me: RequestHandler = (_request, response) => {
  const session = response.locals.session;

  response.setHeader("X-CSRF-Token", session.csrf);
  response.json(session.user);
};

export const logout: RequestHandler = async (request, response) => {
  const token: unknown = request.cookies?.token;

  if (token !== undefined) {
    const session = await authService.getSession(token);

    if (request.get("X-CSRF-Token") !== session.csrf) {
      throw new ForbiddenError("Invalid CSRF token");
    }
  }

  response.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api",
  });
  response.status(204).end();
};
