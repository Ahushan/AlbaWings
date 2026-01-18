import mongoose from "mongoose";

/* IMAGE SCHEMA (Cloudinary Safe) */
const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

/* VARIANT ATTRIBUTE (Color, Size, Storage) */
const variantAttributeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    label: {
      type: String,
      required: true
    },
    values: {
      type: [String],
      required: true
    }
  },
  { _id: false }
);

/* VARIANT PRICING */
const variantPricingSchema = new mongoose.Schema(
  {
    mrp: {
      type: Number,
      required: true,
      min: 0
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

/* VARIANT INVENTORY */
const variantInventorySchema = new mongoose.Schema(
  {
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    isOutOfStock: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

/* VARIANT (SELLABLE UNIT = SKU) */
const variantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
      // ❗ uniqueness enforced at application level
    },

    attributes: {
      type: Map,
      of: String,
      required: true
    },

    pricing: {
      type: variantPricingSchema,
      required: true
    },

    inventory: {
      type: variantInventorySchema,
      required: true
    },

    images: {
      type: [imageSchema],
      required: true
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

/* MAIN PRODUCT SCHEMA */
const productSchema = new mongoose.Schema(
  {
    basicInfo: {
      title: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      description: {
        type: String,
        required: true
      },
      brand: {
        type: String,
        required: true
      }
    },

    variantAttributes: {
      type: [variantAttributeSchema],
      required: true
    },

    variants: {
      type: [variantSchema],
      required: true
    },

    media: {
      thumbnail: {
        type: imageSchema,
        required: true
      },
      fallbackImages: {
        type: [imageSchema]
      }
    },

    category: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },

    specifications: {
      type: Map,
      of: String
    },

    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String]
    },

    flags: {
      isFeatured: {
        type: Boolean,
        default: false
      },
      isBestSeller: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: true
      }
    }
  },
  { timestamps: true }
);

/* AUTO INVENTORY LOGIC */
productSchema.pre("save", function (next) {
  this.variants.forEach((variant) => {
    variant.inventory.isOutOfStock = variant.inventory.stock <= 0;
  });
  next();
});

/* INDEXES (PRODUCTION CRITICAL) */

// Text search
productSchema.index({
  "basicInfo.title": "text",
  "basicInfo.brand": "text"
});

// SKU lookup (cart / order)
productSchema.index({ "variants.sku": 1 });

// Category filter
productSchema.index({ "category._id": 1 });

// Active products
productSchema.index({ "flags.isActive": 1 });

export default mongoose.model("Product", productSchema);
