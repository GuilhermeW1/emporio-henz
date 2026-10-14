import { PrismaClient } from "@prisma/client";
import { Category } from "../models/Category";

const prisma = new PrismaClient();

//cadastro de categoria
export const registerCategory = async (req, res) => {
    try {
        const {name} = req.body ?? {};

        if (!name || name.trim() === "") {
            return res.status(400).json({error: "Nome da categoria é obrigatorio"});

        }

        const categoryModel = new Category(null, name);

        const catExists = await prisma.category.findFirst({where: { name: categoryModel.name }});

        if (catExists) {
            return res.status(400).json({ error: "Categoria já cadastrada." });
        }

        const newCategory = await prisma.category.create({
            data: {
                name: categoryModel.name
            }
        });

        return res.status(201).json({
            message: "Categoria criada",
            category: newCategory
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const category = await prisma.category.findUnique({
            where: { id },
            select: {
                id: true,
                name: true
            }
        });

        if (!category) {
            return res.status(404).json({error: "Categoria nao encontrada"});
        }

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};