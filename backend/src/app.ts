import express from "express";

import usersRouter from "#src/routes/users";
import drawingsRouter from "#src/routes/drawings";
import { errorHandler } from "#src/utils/middleware";

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/drawings", drawingsRouter);

app.use((_request, response) => {
  response.status(404).json({ error: "Unknown endpoint" });
});

app.use(errorHandler);

export default app;
