import jwt from "jsonwebtoken";
import { ProfileType } from "../models/User.js";

//extrai e valida o token dos headers
const verifyToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("TOKEN_MISSING");

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new Error("TOKEN_INVALID_FORMAT");        
    }

    const token = parts[1];
    //decodifica o payload
    return jwt.verify(token, process.env.JWT_SECRET);
}
//middleware que exige que quem esta fazendo a req seja admin
export const requireAdmin = async (req, res, next) => {
    try {
        const decoded = verifyToken(req);

        if (decoded.profile !== ProfileType.ADMIN) {
            return res.status(403).json({ error: "Acesso restrito a admins"});
        }

        req.currentUser = decoded;
        return next();
    } catch (error) {
        if (error.message === "TOKEN_MISSING") {
            return res.status(401).json({ error: "Acesso negado. Token nao fornecido" });
        }
        if (error.message === "TOKEN_INVALID_FORMAT") {
            return res.status(401).json({ error: "Formato de token invalido, use 'Bearer <token'"});
        }
        return res.status(401).json({ error: "Token invalido ou expirado" });
    }
};

//permite se for o admin ou o proprio user mexendo no seu proprio perfil
export const requireSelfOrAdmin = async (req, res, next) => {
    try {
        const decoded = verifyToken(req);
        const targetUserId = Number(req.params.id); //id do perfil que esta sendo alterado

        const isAdmin = user.profile === ProfileType.ADMIN;
        const isSelf = requesterId === targetUserId;

        if (!isAdmin && !isSelf) {
            return res.status(403).json({ error: "Voce so tem permissao para alterar o seu proprio perfil." });
        }

        req.currentUser = decoded;
        return next();
    } catch (error) {
         if (error.message === "TOKEN_MISSING") {
            return res.status(401).json({ error: "Acesso negado. Token nao fornecido" });
        }
        if (error.message === "TOKEN_INVALID_FORMAT") {
            return res.status(401).json({ error: "Formato de token invalido, use 'Bearer <token'"});
        }
        return res.status(401).json({ error: "Token invalido ou expirado" });
    }
};