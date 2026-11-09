import { PrismaClient } from "@prisma/client";
import { Product } from "../models/Product.js";

const prisma = new PrismaClient();

export const registerProduct = async (req, res) => {
    try {
        const {name, description, price, categoryIds, images} = req.body ?? {};

        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ error: "É obrigatório cadastrar pelo menos 1 imagem para o produto." });
        }

        if (images && images.length > 5) {
            return res.status(400).json({ error: "Um produto cadastrado pode ter no maximo 5 imagens" });
        }

        const normalizedColors = images.map(img => img.color?.trim().toLowerCase());
        const uniqueColors = new Set(normalizedColors);

        if (uniqueColors.size !== normalizedColors.length) {
            return res.status(400).json({ error: "Não é permitido cadastrar imagens com cores duplicadas" });
        }

        const productModel = new Product(
            null,
            name,
            categoryIds,
            0,
            description,
            Number(price),
            images || []

        );

        const foundCategories = await prisma.category.findMany({
            where: { id: { in: productModel.categoryIds } }
        });

        if (foundCategories.length !== productModel.categoryIds.length) {
            return res.status(404).json({error: "Uma ou mais categorias informadas nao foram encontradas"});
        }

        const newProduct = await prisma.product.create({
            data: {
                name: productModel.name,
                description: productModel.description,
                price: productModel.price,
                categories: {
                    connect: productModel.categoryIds.map((id) => ({ id }))
                },
                images: productModel.images && productModel.images.length > 0 ? {
                    create: productModel.images.map((img) => ({
                        url: typeof img === 'string' ? img : img.url,
                        color: (typeof img === 'object' && img.color) ? img.color : "Padrão"
                    }))
                } : undefined
            },
            include: {
                categories: { select: { id: true, name: true } },
                images: { select: { id: true, url: true, color: true } }
            }
        });

        return res.status(201).json({
            message: "Produto cadastrado!",
            product: newProduct
        });
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { name, categoryId } = req.query;
        
        const where = {};

        if (name) {
            where.name = {
                contains: name,
                mode: "insensitive"
            };
        }

        if (categoryId) {
            where.categories = {
                some: {
                    id: Number(categoryId)
                }
            };
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                categories: { select: { id: true, name: true } },
                images: { select: { id: true, url: true, color: true } }
            }
        });

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
}

export const getProductsById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        //incrementa o viewcount
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                viewCount: { increment: 1 }
            },
            include: {
                categories: { select: { id: true, name: true } },
                images: { select: { id: true, url: true, color: true } }
            }
        });

        return res.status(200).json(product);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Produto nao encontrado"});
        } return res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryIds, images } = req.body ?? {};

        if (images && images.length > 5) {
            return res.status(400).json({ error: "Um produto cadastrado pode ter no maximo 5 imagens "});
        }

        const productId = Number(id);

        if (!productId || isNaN(productId)) {
            return res.status(400).json({ error: "ID de produto é invalid" });
        }

        const productModel = new Product (
            productId,
            name,
            categoryIds,
            0,
            description,
            Number(price),
            images || []
        );

        const existingProduct = await prisma.product.findUnique({
            where: { id: productModel.id }
        });

        if (!existingProduct) {
            return res.status(404).json({ error: "Produto nao encontrado "});
        }

        const foundCategories = await prisma.category.findMany({
            where: { id: { in: productModel.categoryIds } }
        });

        if (foundCategories.length !== productModel.categoryIds.length) {
            return res.status(404).json({ error: "Uma ou mais categorias informadas nao foram encontradas" });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productModel.id},
            data: {
                name: productModel.name,
                description: productModel.description,
                price: productModel.price,
                categories: {
                    set: productModel.categoryIds.map((catId) => ({ id: catId }))
                },
                images: productModel.images.length > 0 ? {
                    deleteMany: {},
                    create: productModel.images.map((img) => ({
                        url: img.url,
                        color: img.color || "Padrao"
                    }))
                } : undefined
            },
            include: {
                categories: { select: { id: true, name: true } },
                images: { select: {id: true, url: true, color: true } }
            }
        });

        return res.status(200).json({
            message: "Produto atualizado com sucesso!",
            product: updatedProduct
        });
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await prisma.product.findUnique({
            where: { id: Number(id) }
        });

        if (!existingProduct) {
            return res.status(404).json({error: "Produto nao encontrado"});
        }

        await prisma.product.delete({ where: { id: Number(id) } });

        return res.status(200).json({message: "Produto removido com sucesso"});
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}; 