import { PrismaClient } from "@prisma/client";
import { ProfileType } from "../models/User.js";

const prisma = new PrismaClient();

//middleware que exige que quem esta fazendo a req seja admin
export const requireAdmin = async (req, res, next) => {
    try {
        //pega o ID do user autenticado enviado no header de requisicao
        const requesterId = Number(req.headers["x-user-id"]);

        if (!requesterId) {
            return res.status(401).json({ error: "Acesso negado. Usuario não identificado." });
        }

        const user = await prisma.user.findUnique({ where: { id: requesterId } });

        if (!user || user.profile !== ProfileType.ADMIN) {
            return res.status(403).json({ error: "Acesso restrito a administradores." });
        }

        req.currentUser = user; //guarda os dados do usuario atual na req
        next(); //autorizado: segue para o controller
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//permite se for o admin ou o proprio user mexendo no seu proprio perfil
export const requireSelfOrAdmin = async (req, res, next) => {
    try {
        const requesterId = Number(req.headers["x-user-id"]);
        const targetUserId = Number(req.params.id); //id do perfil que esta sendo alterado

        if (!requesterId) {
            return res.status(401).json({ error: "Acesso negado. Usuario não identificado." });
        }

        const user = await prisma.user.findUnique({ where: { id: requesterId } });

        if (!user) {
            return res.status(404).json({ error: "Usuário solicitante não encontrado." });
        }

        const isAdmin = user.profile === ProfileType.ADMIN;
        const isSelf = requesterId === targetUserId;

        if (!isAdmin && !isSelf) {
            return res.status(403).json({ error: "Voce so tem permissao para alterar o seu proprio perfil." });
        }

        req.currentUser = user;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};