import React from "react";
import { type UploadedImage } from "@/admin/types/image.js";

interface ImageListerProps {
  images: UploadedImage[];
  uniqueId: string | number;
  onRemove?: (index: number) => void;
  preview?: boolean;
}

export const ImageLister: React.FC<ImageListerProps> = ({
  images,
  uniqueId,
  onRemove,
  preview = true,
}) => {
  if (!images.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {images.map((img, index) => (
        <div
          key={`${uniqueId}-${index}`}
          className="relative w-24 h-24 border rounded overflow-hidden"
        >
          {preview && (
            <img
              src={img.url}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
          )}

          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
