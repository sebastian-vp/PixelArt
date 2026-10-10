import type { RequestHandler } from "express";

import { getSession } from "#src/services/auth";
import { ForbiddenError } from "#src/utils/errors";

export const requireSession: RequestHandler = async (request, response, next) => {
  const token: unknown = request.cookies?.token;
  response.locals.session = await getSession(token);

  next();
};

export const requireCsrf: RequestHandler = (request, response, next) => {
  if (request.get("X-CSRF-Token") !== response.locals.session.csrf) {
    throw new ForbiddenError("Invalid CSRF token");
  }

  next();
};
