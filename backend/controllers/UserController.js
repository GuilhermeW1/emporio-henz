import { PrismaClient } from "@prisma/client";
import { User, ProfileType } from "../models/User.js";

const prisma = new PrismaClient();

//cadastro de usuario
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profile } = req.body ?? {};

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios." });
        }

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "E-mail já cadastrado." });
        }

        //instancia a classe User
        const userModel = new User(null, name, email, profile || ProfileType.CLIENT, password);

        //separa o salt e o hash gerados para salvar nas colunas do Prisma
        const [salt, hash] = userModel.password.split(":");

        const newUser = await prisma.user.create({
            data: {
                name: userModel.name,
                email: userModel.email,
                password: hash,
                salt: salt,
                profile: userModel.profile
            },
            select: { id: true, name: true, email: true, profile: true }
        });

        return res.status(201).json({
            message: "Usuario cadastrado com sucesso!",
            user: newUser
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

//login/autenticacao
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha sao obrigatorios." });
        }

        const dbUser = await prisma.user.findUnique({ where: { email } });
        if (!dbUser) {
            return res.status(401).json({ error: "Credenciais invalidas." });
        }

        //reconstroi a string salt:hash que o seu User espera
        const storedPasswordCombined = `${dbUser.salt}:${dbUser.password}`;

        //instancia o User com o hash vindo do banco
        const userInstance = new User(
            dbUser.id, 
            dbUser.name, 
            dbUser.email, 
            dbUser.profile, 
            storedPasswordCombined
        );

        //valida a senha enviada
        if (!userInstance.verifyPassword(password)) {
            return res.status(401).json({ error: "Credenciais invalidas." });
        }

        return res.status(200).json({
            message: "Login realizado com sucesso",
            user: {
                id: userInstance.id,
                name: userInstance.name,
                email: userInstance.email,
                profile: userInstance.profile
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//lista todos os users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                profile: true
            }
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Busca um unico user por ID (pode ser tanto ADMIN quanto o proprio CLIENT)
export const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                profile: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario não encontrado." });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Update no perfil de user
export const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, password, profile } = req.body ?? {};
        const currentUser = req.currentUser;

        //busca o user existente no banco para reaproveitar os dados atuais
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            return res.status(404).json({ error: "Usuario não encontrado." });
        }

        //trava - se tentar alterar o perfil sem ser ADMIN, nega o acesso
        if (profile && currentUser?.profile !== ProfileType.ADMIN) {
            return res.status(403).json({ error: "Apenas administradores podem alterar o perfil do usuario." });
        }

        const dataToUpdate = {};

        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        //apenas admin pode alterar perfil de user (OU se for o proprio CLIENT mudando seu proprio perfil)
        if (profile && currentUser?.profile === ProfileType.ADMIN) {
            dataToUpdate.profile = profile;
        }

        //se informada uma nova senha, refaz o hash
        if (password) {
            const userInstance = new User(
                id, 
                name || existingUser.name, 
                email || existingUser.email, 
                existingUser.profile, 
                password
            );
            const [salt, hash] = userInstance.password.split(":");
            dataToUpdate.password = hash;
            dataToUpdate.salt = salt;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
            select: { id: true, name: true, email: true, profile: true }
        });

        return res.status(200).json({
            message: "Perfil atualizado com sucesso!",
            user: updatedUser
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

//removendo user pelo ID
export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const userExists = await prisma.user.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(404).json({ error: "Usuario não encontrado." });
        }

        await prisma.user.delete({ where: { id } });

        return res.status(200).json({ message: "Usuario removido com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};