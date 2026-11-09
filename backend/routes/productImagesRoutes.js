import { Router } from "express";
import {
    registerProductImage,
    updateProductImage,
    deleteProductImage
} from "../controllers/ProductImageController.js";
import {requireAdmin} from "../middlewares/auth.js";

const router = Router();

router.post("/", requireAdmin, registerProductImage);
router.put("/:id", requireAdmin, updateProductImage);
router.delete("/:id", requireAdmin, deleteProductImage);

export default router;
