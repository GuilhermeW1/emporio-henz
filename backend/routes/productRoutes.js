import { Router } from "express";
import { registerProduct } from "../controllers/ProductController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/", requireAdmin, registerProduct);


export default router;