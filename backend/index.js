import ex from "express";
import "dotenv/config";
import cors from "cors";
import {PrismaClient} from "@prisma/client";
import userRoutes from "./routes/userRoutes";
const prisma = new PrismaClient();
const app = ex();

//middlewares
app.use(cors({origin: process.env.ORIGEM_DO_FRONTEND ?? "*"}));
app.use(ex.json());

//rota de verificacao do server
app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/users", userRoutes);


app.listen(3001, () => {
    console.log(`API ouvindo em http://localhost:3001`);
}); 
