import { Router } from "express";

import {
  listDrawings,
  getDrawing,
  createDrawing,
  updateDrawing,
  deleteDrawing,
} from "#src/controllers/drawings";

const router = Router();

router.get("/", listDrawings);
router.post("/", createDrawing);
router.get("/:id", getDrawing);
router.put("/:id", updateDrawing);
router.delete("/:id", deleteDrawing);

export default router;
