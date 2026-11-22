import { Router } from "express";

import { reset } from "#src/controllers/testing";

const router = Router();

router.post("/reset", reset);

export default router;
