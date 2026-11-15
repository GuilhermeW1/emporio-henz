import { Router } from "express";
import { uploadImages } from "../controllers/UploadController.js";
import { uploadImagesMiddleware } from "../middlewares/uploadImagesMIddleware.js";

const router = Router();

router.post("/", uploadImagesMiddleware, uploadImages);

export default router;
