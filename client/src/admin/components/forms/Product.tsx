import { useFieldArray } from "react-hook-form";
import { TagInput } from "@/admin/components/commons/TagInput.js";
import { ImageUploader } from "../commons/ImageUploader.js";
import { Trash } from "lucide-react";
import { Categories } from "@/constants/Categories.js";
import { useProductForm } from "@/admin/hooks/useProductForm.js";
import { InfoNote } from "@/components/common/InfoNote.js";

const Product = () => {
  const {
    form,
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    isSubmitting,
    category,
    onSubmit,
    variants,
    addSpecToVariant,
    removeSpecFromVariant,
  } = useProductForm();

  const {
    fields: variantFields,
    append: addVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: "variants" });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 relative space-y-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md mb-10 border border-gray-200"
    >
      <button
        type="button"
        className="absolute top-4 right-4 text-white font-semibold hover:scale-105 transition bg-red-600 px-3 py-1 rounded"
        onClick={() => form.reset()}
      >
        Reset
      </button>

      {/* BASIC INFO */}
      <h2 className="text-2xl font-semibold text-gray-800">Basic Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Product Title <span className="text-red-500">*</span>
          </label>
          <InfoNote type="info">
            <p>
              First letter capital, Human-friendly, Do not include variant info
              (size, color, etc.)
            </p>
            <b>Men's Slim Fit Casual Shirt, Samsung Galaxy S25 Ultra</b>
          </InfoNote>
          <input
            {...register("basicInfo.title", {
              required: "Product title is required",
            })}
            placeholder="Product Title"
            className={`border p-2 rounded w-full placeholder:text-xs placeholder:text-gray-400 ${
              errors.basicInfo?.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.basicInfo?.title && (
            <p className="text-red-600 text-sm mt-1">
              {errors.basicInfo.title.message}
            </p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium">
            Brand <span className="text-red-500">*</span>
          </label>
          <InfoNote type="info">
            <p>Proper brand name only.</p>
            <b>Levis, Samsung, Apple, Puma</b>
          </InfoNote>
          <input
            {...register("basicInfo.brand", { required: "Brand is required" })}
            placeholder="Brand"
            className={`border p-2 rounded w-full placeholder:text-xs placeholder:text-gray-400 ${
              errors.basicInfo?.brand ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.basicInfo?.brand && (
            <p className="text-red-600 text-sm mt-1">
              {errors.basicInfo.brand.message}
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-1 font-medium">
            Slug <span className="text-red-500">*</span>
          </label>
          <InfoNote type="warning">
            <p>
              Lowercase, hyphens only, must include
              brand-title-subCategory-category.
            </p>
            <b>levis-shirt-men-fashion</b>
          </InfoNote>
          <input
            {...register("basicInfo.slug", { required: "Slug is required" })}
            placeholder="Slug"
            className={`border p-2 rounded w-full placeholder:text-xs placeholder:text-gray-400 ${
              errors.basicInfo?.slug ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.basicInfo?.slug && (
            <p className="text-red-600 text-sm mt-1">
              {errors.basicInfo.slug.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <InfoNote type="info">
            <p>2–3 lines, Clear sentence, Product overview.</p>
            <b>
              A premium cotton shirt designed for comfort and modern everyday
              wear. Perfect for office, casual, and party looks.
            </b>
          </InfoNote>
          <textarea
            {...register("basicInfo.description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters required",
              },
            })}
            placeholder="Description"
            className={`border p-2 rounded w-full placeholder:text-xs placeholder:text-gray-400 h-24 ${
              errors.basicInfo?.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.basicInfo?.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.basicInfo.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category._id", { required: "Category is required" })}
            className={`border p-2 rounded w-full placeholder:text-xs placeholder:text-gray-400 ${
              errors.category?._id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" className="text-gray-400 text-xs">
              Select Category
            </option>
            {Categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* VARIANTS */}
      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold">Variants</h2>

        {variantFields.map((variant, index) => (
          <div
            key={variant.id}
            className="border p-4 rounded-lg space-y-3 bg-gray-50 relative"
          >
            <h4 className="font-semibold text-lg text-gray-800">
              Variant {index + 1}
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {/* SKU */}
              <div>
                <label className="block mb-1 font-medium">SKU</label>
                <input
                  {...register(`variants.${index}.sku`, {
                    required: "SKU required",
                  })}
                  placeholder="SKU"
                  className={`border p-2 rounded w-full placeholder:text-xs ${
                    errors.variants?.[index]?.sku
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>

              {/* Attributes */}
              <div>
                <label className="block mb-1 font-medium">Attributes</label>
                <input
                  placeholder="Color"
                  {...register(`variants.${index}.attributes.color`)}
                  className="border p-2 rounded w-full placeholder:text-xs mb-2"
                />
                <input
                  placeholder="Size"
                  {...register(`variants.${index}.attributes.size`)}
                  className="border p-2 rounded w-full placeholder:text-xs"
                />
              </div>

              {/* Pricing */}
              <div>
                <label className="block mb-1 font-medium">MRP</label>
                <input
                  type="number"
                  {...register(`variants.${index}.pricing.mrp`, {
                    valueAsNumber: true,
                  })}
                  className="border p-2 rounded w-full placeholder:text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Selling Price</label>
                <input
                  type="number"
                  {...register(`variants.${index}.pricing.sellingPrice`, {
                    valueAsNumber: true,
                  })}
                  className="border p-2 rounded w-full placeholder:text-xs"
                />
              </div>

              {/* Inventory */}
              <div>
                <label className="block mb-1 font-medium">Stock</label>
                <input
                  type="number"
                  {...register(`variants.${index}.inventory.stock`, {
                    valueAsNumber: true,
                  })}
                  className="border p-2 rounded w-full placeholder:text-xs"
                />
              </div>

              {/* Image Uploader */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Images</label>
                <ImageUploader
                  uniqueId="product-images"
                  folderUrl="products"
                  multiple
                  onUploadComplete={(imgs) => {
                    console.log("Uploaded images:", imgs);
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="text-red-600 text-sm absolute top-4 right-4 flex items-center"
            >
              <Trash size={14} className="mr-1" /> Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addVariant({
              sku: "",
              attributes: { color: "", size: "" },
              pricing: { mrp: 0, sellingPrice: 0 },
              inventory: { stock: 0, isOutOfStock: false },
              images: [],
              isDefault: false,
            })
          }
          className="text-blue-600 font-medium hover:underline"
        >
          + Add Variant
        </button>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded font-medium mt-6"
      >
        {isSubmitting ? "Submitting..." : "Save Product"}
      </button>
    </form>
  );
};

export default Product;
