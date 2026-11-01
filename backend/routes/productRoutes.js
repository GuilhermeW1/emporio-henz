import { Router } from "express";
import { 
    registerProduct,
    getAllProducts,
    getProductsById,
    updateProduct,
    deleteProduct 
} from "../controllers/ProductController.js";
import { requireAdmin, requireSelfOrAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductsById);

router.post("/", requireAdmin, registerProduct);
router.put("/:id", requireAdmin, updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);


export default router;