import { Router } from "express";

import { login, logout, me } from "#src/controllers/auth";

import { requireSession } from "#src/utils/auth";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireSession, me);

export default router;
