import { PrismaClient } from "@prisma/client";
import cors from "cors";
import "dotenv/config";
import ex from "express";
import path from "path";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/userRoutes.js";
import productImageRoutes from "./routes/productImagesRoutes.js";
const prisma = new PrismaClient();
const app = ex();

//middlewares
app.use(cors({ origin: process.env.ORIGEM_DO_FRONTEND ?? "*" }));
app.use(ex.json());

//rota de verificacao do server
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-images", productImageRoutes);

app.use("/uploads", ex.static(path.resolve(process.cwd(), "uploads")));
app.use("/api/upload", uploadRoutes);

app.listen(3001, () => {
  console.log(`API ouvindo em http://localhost:3001`);
});
