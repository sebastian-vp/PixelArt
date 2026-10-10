import { Router } from "express";

import {
  listDrawings,
  getDrawing,
  createDrawing,
  updateDrawing,
  deleteDrawing,
} from "#src/controllers/drawings";

import { requireCsrf, requireSession } from "#src/utils/auth";

const router = Router();

router.use(requireSession);

router.get("/", listDrawings);
router.post("/", requireCsrf, createDrawing);
router.get("/:id", getDrawing);
router.put("/:id", requireCsrf, updateDrawing);
router.delete("/:id", requireCsrf, deleteDrawing);

export default router;
