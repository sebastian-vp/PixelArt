export class InvalidInputError extends Error {
  constructor(message = "Invalid input") {
    super(message);
  }
}

export class NotFoundError extends Error {}
