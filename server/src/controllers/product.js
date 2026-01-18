import Product from "../models/Product.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";

/* CREATE PRODUCT (ADMIN) */

export const createProduct = async (req, res) => {
  try {
    const {
      basicInfo,
      variantAttributes,
      variants,
      media,
      category,
      specifications,
      seo,
      flags
    } = req.body;

    /*  BASIC VALIDATIONS  */
    if (!basicInfo || !variants || variants.length === 0) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    /*  SLUG GENERATION  */
    let slug = slugify(basicInfo.title, { lower: true });

    const slugExists = await Product.findOne({ "basicInfo.slug": slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    /*  SKU UNIQUENESS CHECK  */
    const skus = variants.map(v => v.sku);

    const skuExists = await Product.findOne({
      "variants.sku": { $in: skus }
    });

    if (skuExists) {
      return res.status(400).json({
        message: "One or more SKUs already exist"
      });
    }

    /*  DEFAULT VARIANT CHECK  */
    const defaultVariants = variants.filter(v => v.isDefault);
    if (defaultVariants.length !== 1) {
      return res.status(400).json({
        message: "Exactly one default variant is required"
      });
    }

    /*  PRICE VALIDATION  */
    for (const variant of variants) {
      if (variant.pricing.sellingPrice > variant.pricing.mrp) {
        return res.status(400).json({
          message: `Selling price cannot exceed MRP for SKU ${variant.sku}`
        });
      }
    }

    /*  CREATE PRODUCT  */
    const product = await Product.create({
      basicInfo: {
        ...basicInfo,
        slug
      },
      variantAttributes,
      variants,
      media,
      category,
      specifications,
      seo,
      flags
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      "flags.isActive": true
    })
      .select("-variants.inventory")
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      "basicInfo.slug": req.params.slug,
      "flags.isActive": true
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      basicInfo,
      variants,
      media,
      variantAttributes,
      specifications,
      seo,
      flags
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    /*  DEFAULT VARIANT CHECK  */
    if (variants) {
      const defaultVariants = variants.filter(v => v.isDefault);
      if (defaultVariants.length !== 1) {
        return res.status(400).json({
          message: "Exactly one default variant is required"
        });
      }
    }

    /*  SKU PROTECTION  */
    if (variants) {
      variants.forEach((variant, index) => {
        if (
          product.variants[index] &&
          variant.sku !== product.variants[index].sku
        ) {
          throw new Error("SKU cannot be modified");
        }
      });
    }

    /*  IMAGE CLEANUP  */
    if (media?.thumbnail?.publicId &&
        product.media.thumbnail?.publicId !== media.thumbnail.publicId) {
      await cloudinary.uploader.destroy(product.media.thumbnail.publicId);
    }

    /*  APPLY UPDATES  */
    if (basicInfo) product.basicInfo = basicInfo;
    if (variants) product.variants = variants;
    if (variantAttributes) product.variantAttributes = variantAttributes;
    if (media) product.media = media;
    if (specifications) product.specifications = specifications;
    if (seo) product.seo = seo;
    if (flags) product.flags = flags;

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* 
   DELETE PRODUCT (ADMIN)
 */
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    /*  DELETE ALL CLOUDINARY IMAGES  */
    const publicIds = [];

    product.variants.forEach(v =>
      v.images.forEach(img => publicIds.push(img.publicId))
    );

    if (product.media?.thumbnail?.publicId) {
      publicIds.push(product.media.thumbnail.publicId);
    }

    if (publicIds.length) {
      await cloudinary.api.delete_resources(publicIds);
    }

    /*  SOFT DELETE  */
    product.flags.isActive = false;
    await product.save();

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
