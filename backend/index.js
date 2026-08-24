import ex from "express";
import "dotenv/config";
import {PrismaClient} from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();
const app = ex();

app.use(cors({origin: process.env.ORIGEM_DO_FRONTEND ?? "*"}));
app.use(ex.json());

app.get("/health", (req, res) => {
    res.json({ok : true});
});

app.get("/orders", async (req, res) => {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "asc"
        }
    });
    res.json(orders);
});

app.use(ex.json());

app.post("/orders", async (req, res) => {
    const { order, item } =  req.body ?? {};
    if (!order || !item) {
        return res.status(400).json({error: "Order and item are required"});
    }

    const newOrder = await prisma.order.create({
        data: {order, item}
    });

    res.status(201).json(newOrder);
});

app.listen(3001, () => {
    console.log("API ouvindo em http://localhost:3001");
});
