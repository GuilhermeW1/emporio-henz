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

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.post("/", requireAdmin, registerCategory);
router.put("/:id", requireAdmin, updateCategory);
router.delete("/:id", requireAdmin, deleteCategory);

export default router;