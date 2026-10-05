import { PrismaClient } from "@prisma/client";
import { User, ProfileType } from "../models/User.js";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error("Erro: variaveis ADMIN_EMAIL e ADMIN_PASSWORD devems ser definidas em arquivo .env");
    }

    //verifica se admin ja existe
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
        //usa o User para gerar o hash da senha padrão
        const adminModel = new User(null, "Administrador Henz", adminEmail, ProfileType.ADMIN, adminPassword);
        const [salt, hash] = adminModel.password.split(":");

        await prisma.user.upsert({
            data: {
                name: adminModel.name,
                email: adminModel.email,
                password: hash,
                salt: salt,
                profile: ProfileType.ADMIN
            }
        });
        console.log("usuario admin unico criado com sucesso");
    } else {
        console.log("usuario admin ja existe no banco")
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());