import { Router } from "express";
import {
    deleteProduct,
    getAllProducts,
    getProductsById,
    registerProduct,
    updateProduct,
} from "../controllers/ProductController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductsById);

router.post("/", requireAdmin, registerProduct);
router.put("/:id", requireAdmin, updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);

export default router;
