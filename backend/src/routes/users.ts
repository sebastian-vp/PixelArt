import { Router } from "express";

import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "#src/controllers/users";

const router = Router();

router.get("/", listUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
