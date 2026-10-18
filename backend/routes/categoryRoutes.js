import { Router } from "express";
import {
    registerCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController.js";
import {requireAdmin} from "../middlewares/auth.js";

const router = Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

router.post("/categories", requireAdmin, registerCategory);
router.put("/categories/:id", requireAdmin, updateCategory);
router.delete("/categories/:id", requireAdmin, deleteCategory);

export default router;