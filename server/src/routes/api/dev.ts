import { Router, Request, Response } from "express";
import { User } from "../../models/user.js";

const router = Router();

// GET /api/dev - Get all users
router.get('/', async (_req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  });

export default router;