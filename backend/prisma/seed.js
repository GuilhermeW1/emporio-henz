import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { ProfileType, User } from "../models/User.js";

const prisma = new PrismaClient();

const BASE_URL = process.env.APP_URL || "http://localhost:3001";
const SEED_ASSETS_DIR = path.resolve(process.cwd(), "prisma", "seed-assets");
const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");

async function prepareSeedImage(fileName) {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const sourcePath = path.join(SEED_ASSETS_DIR, fileName);
  const destPath = path.join(UPLOADS_DIR, fileName);

  await fs.copyFile(sourcePath, destPath);

  return `${BASE_URL}/uploads/${fileName}`;
}

async function main() {
  const banheiroUrl = await prepareSeedImage("banheiro-category.png");
  const cozinhaUrl = await prepareSeedImage("cozinha-category.png");
  const escritorioUrl = await prepareSeedImage("escritorio-category.png");
  const jantarUrl = await prepareSeedImage("jantar-category.png");
  const quartoUrl = await prepareSeedImage("quarto-category.png");
  const salaUrl = await prepareSeedImage("sala-category.png");

  // 2. Cria categorias (upsert evita duplicação se rodar o seed mais de uma vez)
  const catBanheiro = await prisma.category.upsert({
    where: { name: "Banheiro" },
    update: {},
    create: { name: "Banheiro", imageUrl: banheiroUrl },
  });

  const catCozinha = await prisma.category.upsert({
    where: { name: "Cozinha" },
    update: {},
    create: { name: "Cozinha", imageUrl: cozinhaUrl },
  });
  const catEscritorio = await prisma.category.upsert({
    where: { name: "Escritório" },
    update: {},
    create: { name: "Escritório", imageUrl: escritorioUrl },
  });

  const catSalaJantar = await prisma.category.upsert({
    where: { name: "Sala de Jantar" },
    update: {},
    create: { name: "Sala de Jantar", imageUrl: jantarUrl },
  });

  const catQuarto = await prisma.category.upsert({
    where: { name: "Quarto" },
    update: {},
    create: { name: "Quarto", imageUrl: quartoUrl },
  });

  const catSalaEstar = await prisma.category.upsert({
    where: { name: "Sala de Estar" },
    update: {},
    create: { name: "Sala de Estar", imageUrl: salaUrl },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Erro: variaveis ADMIN_EMAIL e ADMIN_PASSWORD devems ser definidas em arquivo .env",
    );
  }

  //usa o User para gerar o hash da senha padrão
  const adminModel = new User(
    null,
    "Administrador Henz",
    adminEmail,
    ProfileType.ADMIN,
    adminPassword,
  );
  const [salt, hash] = adminModel.password.split(":");

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: adminModel.name,
      email: adminModel.email,
      password: hash,
      salt: salt,
      profile: ProfileType.ADMIN,
    },
  });
  console.log("Seed de admin criado com sucesso");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
