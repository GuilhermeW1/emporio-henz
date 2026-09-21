import ex from "express";
import "dotenv/config";
import cors from "cors";
import {PrismaClient} from "@prisma/client";
import {User, ProfileType} from './models/User.js';
const prisma = new PrismaClient();
const app = ex();

//middlewares
app.use(cors({origin: process.env.ORIGEM_DO_FRONTEND ?? "*"}));
app.use(ex.json());

//armazenamento em memoria para teste do backend
const users = [];
let idCounter = 1;

//rota de verificacao do server
app.get("/health", (req, res) => {
    res.json({ ok: true });
});

//get - lista todos os usuarios
app.get('/api/users', (req, res) => {
    const listFormatted = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        profile: u.profile
    }));
    return res.status(200).json(listFormatted);
});

//get -busca um usuario por id
app.get('/api/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: "Usuario nao encontrado" });
    }

    return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile
    });
});

//post - cadastro do usuario
app.post('/api/users/register', (req, res) => {
    try {
        const {name, email, password, profile} = req.body ?? {};
        //validacao de campos obrigatorios
        if (!name || !email || !password) {
            return res.status(400).json({error: "Nome, email e senha sao obrigatorios"});
        }
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({Error: 'email ja cadastrado'});
        }

        const newUser = new User(idCounter++, name, email, profile || ProfileType.CLIENT, password);
        users.push(newUser);
        return res.status(201).json({
            message: "Usuario cadastrado!",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                profile: newUser.profile
            }
        });
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
});

//post - login
app.post('/api/users/login', (req, res) => {
    const {email, password} = req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({ error: 'email e senha são obrigatórios.' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({error: 'Credenciais invalidas'});
    }

    const isPassValid = user.verifyPassword(password);
    if (!isPassValid) {
        return res.status(401).json({error: 'Credenciais invalidas'});
    }

    return res.status(200).json({
        message: 'Login realizado!',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            profile: user.profile
        }
    });
});

//put - atualiza perfil do usuario
app.put('/api/users/:id', (req, res) => {
    try {
        const userId = Number(req.params.id);
        const {name, email, profile} = req.body ?? {};

        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({error: "Usuario nao encontrado"});
        }

        //atualizacao via setters da classe User
        if (name) user.name = name;
        if (email) user.email = email;
        if (profile) user.profile = profile;

        return res.status(200).json({
            message: 'Perfil atualizado!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
});

app.listen(3001, () => {
    console.log(`API ouvindo em http://localhost:3001`);
}); 
