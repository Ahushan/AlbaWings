import React, { useState, type ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ImagePlus, Loader2 } from "lucide-react";
import { type UploadedImage } from "@/admin/types/image.js";
import { ImageLister } from "./ImageLister.js";
import api from "@/api/axios.js";

interface ImageUploaderProps {
  uniqueId: string | number;
  folderUrl?: string;
  initialImages?: UploadedImage[];
  multiple?: boolean;
  maxSizeMB?: number;
  onUploadComplete: (images: UploadedImage[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  uniqueId,
  folderUrl = "products",
  initialImages = [],
  multiple = true,
  maxSizeMB = 5,
  onUploadComplete,
}) => {
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});

  // ✅ Handle file upload
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    setUploading(true);

    for (const file of files) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`Max ${maxSizeMB}MB allowed`);
        continue;
      }

      try {
        // 1️⃣ Get Cloudinary signature from backend
        const { data } = await api.get(`/cloudinary/signature?folder=${folderUrl}`);

        // 2️⃣ Build form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", data.apiKey);
        formData.append("timestamp", String(data.timestamp));
        formData.append("signature", data.signature);
        formData.append("folder", data.folder);

        // 3️⃣ Upload to Cloudinary with progress
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent: any) => {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress((prev) => ({ ...prev, [file.name]: percent }));
            },
          }
        );

        const uploadedImage: UploadedImage = {
          url: uploadRes.data.secure_url,
          publicId: uploadRes.data.public_id,
        };

        // 4️⃣ Update state safely
        setImages((prev) => {
          const updated = multiple ? [...prev, uploadedImage] : [uploadedImage];
          onUploadComplete(updated);
          return updated;
        });

        toast.success(`${file.name} uploaded`);
        setProgress((prev) => {
          const updated = { ...prev };
          delete updated[file.name];
          return updated;
        });
      } catch (err) {
        console.error(err);
        toast.error(`Upload failed: ${file.name}`);
        setProgress((prev) => {
          const updated = { ...prev };
          delete updated[file.name];
          return updated;
        });
      }
    }

    setUploading(false);
    if (e.target) e.target.value = "";
  };

  // ✅ Remove image + delete from Cloudinary
  const removeImage = async (index: number) => {
    const image = images[index];

    if (!image) return;

    try {
      await api.delete("/cloudinary/delete", {
        data: { publicId: image.publicId },
      });

      setImages((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        onUploadComplete(updated);
        return updated;
      });

      toast.success("Image deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload box */}
      <label
        htmlFor={`image-upload-${uniqueId}`}
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
          hover:border-blue-500 hover:bg-blue-50 transition text-gray-500`}
      >
        {uploading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            <ImagePlus className="w-8 h-8 mb-2" />
            <p className="text-sm">Click to upload images</p>
            <p className="text-xs text-gray-400">
              PNG, JPG up to {maxSizeMB}MB
            </p>
          </>
        )}

        <input
          id={`image-upload-${uniqueId}`}
          type="file"
          accept="image/*"
          multiple={multiple}
          disabled={uploading}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Progress per file */}
      {Object.entries(progress).map(([fileName, percent]) => (
        <div key={fileName} className="w-full bg-gray-200 rounded h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-2"
            style={{ width: `${percent}%` }}
          />
          <p className="text-xs text-gray-500 mt-1">{fileName}: {percent}%</p>
        </div>
      ))}

      {/* Image previews */}
      <ImageLister
        images={images}
        uniqueId={uniqueId}
        onRemove={removeImage}
      />
    </div>
  );
};
