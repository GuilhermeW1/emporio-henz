import { saveImageLocally } from "../services/storageService.js";

export async function uploadImages(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Nenhuma imagem foi enviada" });
    }

    const baseUrl = process.env.API_URL || `${req.protocol}://${req.get("host")}`;

    const urls = await Promise.all(
      req.files.map((file) => saveImageLocally(file, baseUrl)),
    );

    return res.status(201).json({ urls });
  } catch (error) {
    console.error("Erro no upload de imagesn", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao processar as imagens" });
  }
}
