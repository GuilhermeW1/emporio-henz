import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from "../controllers/UserController.js";
import { requireAdmin, requireSelfOrAdmin } from "../middlewares/auth.js";

const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/", requireAdmin, getAllUsers);
router.delete("/:id", requireAdmin, deleteUser);

//ADMIN pode visualizar e editar qualquer perfil. 
//CLIENT pode visualizar e editar apenas o seu próprio ID.
router.get("/:id", requireSelfOrAdmin, getUserById);
router.put("/:id", requireSelfOrAdmin, updateUser);

export default router;