import { PrismaClient } from "@prisma/client";
import { Product } from "../models/Product.js";

const prisma = new PrismaClient();

export const registerProduct = async (req, res) => {
    try {
        const {name, description, price, categoryIds, images} = req.body ?? {};
        
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
                images: productModel.images.length > 0 ? {
                    create: productModel.images.map((imageUrl) => ({ url: imageUrl }))
                } : undefined
            },
            include: {
                categories: { select: { id: true, name: true } },
                images: { select: { id: true, url: true } }
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