import express from "express";

const app = express();

app.use(express.json());

app.use((_request, response) => {
  response.status(404).json({ error: "Unknown endpoint" });
});

export default app;
