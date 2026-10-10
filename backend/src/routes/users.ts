import { Router } from "express";

import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "#src/controllers/users";

import { requireCsrf, requireSession } from "#src/utils/auth";

const router = Router();

router.post("/", createUser);
router.use(requireSession);
router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/:id", requireCsrf, updateUser);
router.delete("/:id", requireCsrf, deleteUser);

export default router;
