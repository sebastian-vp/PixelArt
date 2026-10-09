import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";

import { InvalidInputError, NotFoundError } from "#src/utils/errors";

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof NotFoundError) {
    response.status(404).json({ error: error.message });
  } else if (error instanceof InvalidInputError) {
    response.status(400).json({ error: error.message });
  } else if (
    error instanceof ZodError ||
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError ||
    (error instanceof Error && error.message === "Invalid input") ||
    (error instanceof SyntaxError && "status" in error && error.status === 400)
  ) {
    response.status(400).json({ error: "Invalid input" });
  } else if (error && typeof error === "object" && "code" in error && error.code === 11000) {
    response.status(409).json({ error: "Email already exists" });
  } else {
    response.status(500).json({ error: "Internal server error" });
  }
};
