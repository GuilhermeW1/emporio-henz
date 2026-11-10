import { PrismaClient } from "@prisma/client";
import { ProductImage } from "../models/ProductImage";

const prisma = new PrismaClient();

export const registerProductImage = async (req, res) => {
    try {
        const {productId, url, color} = req.body ?? {};

        if (!productId || !url || !color) {
            return res.status(400).json({error: "productId, url e color sao obrigatorios"});
        }

        const currentImagesCount = await prisma.productImage.count({
            where : { productId: Number(productId) }
        });

        if (currentImagesCount > 5) {
            return res.status(400).json({error: "Um produto cadastrado pode ter no maximo 5 imagens "});
        }

        const existingColor = await prisma.productImage.findFirst({
            where: {
                productId: Number(productId),
                color: { equals : color.trim(), mode: "insensitive"}
            }
        });

        if (existingColor) {
            return res.status(400).json({ error : `O produto ja possui uma variação de imagem registrada para a cor '${color}'.`});
        }

        const productExists = await prisma.product.findUnique({
            where : { id: Number(productId) }
        });

        if (!productExists) {
            return res.status(404).json({error: "Produto nao encontrado"});
        }

        const productImageModel = new ProductImage(
            null,
            Number(productId),
            url,
            color
        );

        const newImage = await prisma.productImage.create({
            data: {
                productId: productImageModel.productId,
                url: productImageModel.url,
                color: productImageModel.color
            }
        });

        return res.status(201).json({
            message: "Imagem do produto cadastrada com sucesso",
            image: newImage
        });
    } catch (error) {
        return res.status(500).json({error: error.message });
    }
}

export const updateProductImage = async (req, res) => {
    try {
        const { id } = Number(req.params.id);
        const { url, color } = req.body ?? {};

        const imageExists = await prisma.productImage.findUnique({ where: { id }});
        if (!imageExists) {
            return res.status(404).json({error: "Imagem nao encontrada"});
        }

        const updateImage = await prisma.productImage.update({
            where: { id },
            data: {
                ...(url && { url }),
                ...(color && { color })
            }
        });

        return res.status(200).json({
            message: "Image atualizada com sucesso",
            image: updateImage
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteProductImage = async (req, res) => {
    try {
        const { id } = Number(req.params.id);

        const imageExists = await prisma.productImage.findUnique({
            where : { id : Number(id) }
        });

        if (!imageExists) {
            return res.status(404).json({ error: "Imagem nao encontrada" });
        }

        await prisma.productImage.delete({ where : { id: Number(id) } });

        return res.status(200).json({ message: "Imagem removida com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}