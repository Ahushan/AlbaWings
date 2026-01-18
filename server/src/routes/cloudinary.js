import express from "express";
import { deleteCloudinaryImage, getCloudinaryUploadToken } from "../controllers/cloudinary.js";

const router = express.Router();

router.get("/signature", getCloudinaryUploadToken);
router.delete("/delete", deleteCloudinaryImage)

export default router;
