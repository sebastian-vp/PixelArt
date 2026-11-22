import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRouter from "#src/routes/auth";
import usersRouter from "#src/routes/users";
import drawingsRouter from "#src/routes/drawings";
import testingRouter from "#src/routes/testing";
import { errorHandler } from "#src/utils/middleware";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_request, response) => {
  response.status(mongoose.connection.readyState === 1 ? 204 : 503).end();
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/drawings", drawingsRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use((_request, response) => {
  response.status(404).json({ error: "Unknown endpoint" });
});

app.use(errorHandler);

export default app;
