export class InvalidInputError extends Error {
  constructor(message = "Invalid input") {
    super(message);
  }
}

export class NotFoundError extends Error {}

export class UnauthorizedError extends Error {}

export class ForbiddenError extends Error {}
