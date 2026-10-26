import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { User, ProfileType } from "../models/User.js";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error("Erro: variaveis ADMIN_EMAIL e ADMIN_PASSWORD devems ser definidas em arquivo .env");
    }

        //usa o User para gerar o hash da senha padrão
        const adminModel = new User(null, "Administrador Henz", adminEmail, ProfileType.ADMIN, adminPassword);
        const [salt, hash] = adminModel.password.split(":");

        await prisma.user.upsert({
            where: {email: adminEmail},
            update: {},
            create: {
                name: adminModel.name,
                email: adminModel.email,
                password: hash,
                salt: salt,
                profile: ProfileType.ADMIN
            }
        });
        console.log("Seed de admin criado com sucesso");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());