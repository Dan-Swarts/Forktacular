import { Router, } from "express";
import { askQuestion } from "../../service/langChainService.js";

const router = Router();

// post /api/ask
router.post('/',askQuestion);

export default router;