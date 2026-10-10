import { Router } from "express";

import { login } from "#src/controllers/auth";

const router = Router();

router.post("/login", login);

export default router;
