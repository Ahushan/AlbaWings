import { useForm, useFieldArray } from "react-hook-form";
import { useMemo } from "react";

/* TYPES */

export interface ImageType {
  url: string;
  publicId: string;
}

export interface ProductFormValues {
  basicInfo: {
    title: string;
    slug: string;
    description: string;
    brand: string;
  };

  category: {
    _id: string;
    name: string;
  };

  variantAttributes: {
    key: string;
    label: string;
    values: string[];
  }[];

  variants: {
    sku: string;
    attributes: Record<string, string>;
    pricing: {
      mrp: number;
      sellingPrice: number;
    };
    inventory: {
      stock: number;
      isOutOfStock: boolean;
    };
    images: ImageType[];
    isDefault: boolean;
  }[];

  media: {
    thumbnail: ImageType | null;
    fallbackImages: ImageType[];
  };

  specifications: Record<string, string>;

  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  flags: {
    isFeatured: boolean;
    isBestSeller: boolean;
    isActive: boolean;
  };
}

/* HOOK */

export function useProductForm() {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      basicInfo: {
        title: "",
        slug: "",
        description: "",
        brand: "",
      },

      category: {
        _id: "",
        name: "",
      },

      variantAttributes: [],

      variants: [
        {
          sku: "",
          attributes: {},
          pricing: { mrp: 0, sellingPrice: 0 },
          inventory: { stock: 0, isOutOfStock: false },
          images: [],
          isDefault: true,
        },
      ],

      media: {
        thumbnail: null,
        fallbackImages: [],
      },

      specifications: {},

      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      },

      flags: {
        isFeatured: false,
        isBestSeller: false,
        isActive: true,
      },
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  /* FIELD ARRAYS */

  const {
    fields: variants,
    append: addVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const {
    fields: variantAttributes,
    append: addVariantAttribute,
    remove: removeVariantAttribute,
  } = useFieldArray({
    control,
    name: "variantAttributes",
  });

  /* HELPERS */

  const category = getValues("category");
  const SubCategory = useMemo(() => null, []);
  const SubCategoryVarients = useMemo(() => null, []);

  const addSpecToVariant = (variantIndex: number, key: string, value: string) => {
    const path = `variants.${variantIndex}.attributes.${key}` as const;
    setValue(path, value);
  };

  const removeSpecFromVariant = (variantIndex: number, key: string) => {
    const attributes = { ...getValues(`variants.${variantIndex}.attributes`) };
    delete attributes[key];
    setValue(`variants.${variantIndex}.attributes`, attributes);
  };

  const onSubmit = async (data: ProductFormValues) => {
    console.log("FINAL PRODUCT PAYLOAD 👇", data);

    // TODO: API call here
    // await api.post("/products", data);
  };

  /* RETURN */

  return {
    form,
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    isSubmitting,

    category,
    SubCategory,
    SubCategoryVarients,

    variantAttributes,
    addVariantAttribute,
    removeVariantAttribute,

    variants,
    addVariant,
    removeVariant,

    onSubmit,
    addSpecToVariant,
    removeSpecFromVariant,
  };
}
