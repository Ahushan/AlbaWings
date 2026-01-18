import cloudinary from "../config/cloudinary.js";
import { generateCloudinarySignature } from "../utils/cloudinarySignature.js";

export const getCloudinaryUploadToken = (req, res) => {
  const { folder } = req.query;

  const { timestamp, signature, cloudName, apiKey, folder: folderName } = generateCloudinarySignature(folder);

  res.json({
    timestamp,
    signature,
    cloudName,
    apiKey,
    folder: folderName
  });
};

export const deleteCloudinaryImage = async (req, res) => {
  try {
    console.log("cloudinary config:", cloudinary.config());    
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ message: "publicId required" });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.status(400).json({ message: "Delete failed" });
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
