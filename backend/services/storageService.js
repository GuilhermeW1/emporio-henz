import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const uploadDir = path.resolve(process.cwd(), "uploads");

export async function saveImageLocally(file, baseUrl) {
  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${crypto.randomUUID()}.webp`;
  const filePath = path.join(uploadDir, fileName);

  const fileBuffer = await sharp(file.buffer)
    .resize({
      width: 1200,
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();

  await fs.writeFile(filePath, fileBuffer);

  return `${baseUrl}/uploads/${fileName}`;
}

export async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  try {
    const fileName = imageUrl.split("/").pop().split("?")[0];
    const filePath = path.resolve("uploads", fileName);

    await fs.unlink(filePath);
  } catch (error) {
    throw new Error("Erro ao exluir imagem" + error);
    console.error(error);
  }
}
