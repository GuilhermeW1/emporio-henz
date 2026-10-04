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

//qualquer pessoa pode enviar e-mail e senha para tentar autenticar
router.post("/login", loginUser);

//apenas o perfil ADMIN pode registrar novos users, listar e remover
router.post("/register", requireAdmin, registerUser);
router.get("/", requireAdmin, getAllUsers);
router.delete("/:id", requireAdmin, deleteUser);

//ADMIN pode visualizar e editar qualquer perfil. 
//CLIENT pode visualizar e editar apenas o seu próprio ID.
router.get("/:id", requireSelfOrAdmin, getUserById);
router.put("/:id", requireSelfOrAdmin, updateUser);

export default router;