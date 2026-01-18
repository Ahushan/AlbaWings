export interface Category {
  name: string;
  subcategories: {
    name: string;
    variants: string[];
  }[];
}

export const Categories: Category[] = [
  {
    name: "Fashion",
    subcategories: [
      {
        name: "Men",
        variants: [
          "Shirts",
          "T-Shirts",
          "Pants",
          "Jeans",
          "Shorts",
          "Ethnic Wear",
          "Jackets",
          "Sweaters",
          "Innerwear",
        ],
      },
      {
        name: "Women",
        variants: [
          "Kurtis",
          "Tops",
          "Sarees",
          "Dresses",
          "Lehenga",
          "Jeans",
          "Leggings",
          "Skirts",
          "Ethnic Wear",
        ],
      },
      {
        name: "Kids",
        variants: [
          "Boys Clothing",
          "Girls Clothing",
          "Kids Footwear",
          "School Uniforms",
        ],
      },
    ],
  },

  {
    name: "Electronics",
    subcategories: [
      {
        name: "Mobiles",
        variants: [
          "Smartphones",
          "Feature Phones",
          "Mobile Cases",
          "Screen Protectors",
          "Chargers",
          "Cables",
          "Power Banks",
        ],
      },
      {
        name: "Laptops",
        variants: [
          "Gaming Laptops",
          "Business Laptops",
          "Laptop Chargers",
          "Laptop Bags",
          "Mouse & Keyboards",
        ],
      },
      {
        name: "Audio",
        variants: [
          "Bluetooth Earbuds",
          "Headphones",
          "Bluetooth Speakers",
          "Home Theatre Systems",
        ],
      },
    ],
  },

  {
    name: "Home & Kitchen",
    subcategories: [
      {
        name: "Kitchen Appliances",
        variants: [
          "Mixer Grinder",
          "Microwave",
          "Air Fryer",
          "Toaster",
          "Electric Kettle",
        ],
      },
      {
        name: "Cookware",
        variants: [
          "Pans",
          "Pots",
          "Pressure Cookers",
          "Tawa",
          "Dinner Sets",
        ],
      },
      {
        name: "Home Decor",
        variants: [
          "Clocks",
          "Wall Art",
          "Decorative Lights",
          "Showpieces",
        ],
      },
    ],
  },

  {
    name: "Furniture",
    subcategories: [
      {
        name: "Living Room",
        variants: ["Sofas", "Chairs", "Tables", "TV Units"],
      },
      {
        name: "Bedroom",
        variants: ["Beds", "Mattresses", "Wardrobes"],
      },
      {
        name: "Office",
        variants: ["Office Chairs", "Office Tables", "Bookshelves"],
      },
    ],
  },

  {
    name: "Beauty",
    subcategories: [
      {
        name: "Makeup",
        variants: ["Lipstick", "Foundation", "Eyeliner", "Mascara"],
      },
      {
        name: "Skincare",
        variants: ["Face Wash", "Moisturizer", "Serum", "Sunscreen"],
      },
      {
        name: "Haircare",
        variants: ["Shampoo", "Conditioner", "Hair Oil", "Styling Products"],
      },
    ],
  },

  {
    name: "Grocery",
    subcategories: [
      {
        name: "Food",
        variants: ["Rice", "Dal", "Oil", "Masala", "Snacks"],
      },
      {
        name: "Beverages",
        variants: ["Tea", "Coffee", "Soft Drinks", "Juices"],
      },
      {
        name: "Household",
        variants: ["Detergent", "Cleaners", "Tissues"],
      },
    ],
  },

  {
    name: "Footwear",
    subcategories: [
      {
        name: "Men",
        variants: ["Sports Shoes", "Formal Shoes", "Casual Shoes", "Sandals"],
      },
      {
        name: "Women",
        variants: ["Heels", "Flats", "Casual Shoes", "Sneakers"],
      },
      {
        name: "Kids",
        variants: ["School Shoes", "Sports Shoes", "Sandals"],
      },
    ],
  },

  {
    name: "Jewelry",
    subcategories: [
      {
        name: "Women",
        variants: ["Necklace", "Rings", "Earrings", "Bracelets"],
      },
      {
        name: "Men",
        variants: ["Chains", "Bracelets", "Rings"],
      },
    ],
  },

  {
    name: "Sports",
    subcategories: [
      {
        name: "Cricket",
        variants: ["Bats", "Balls", "Kits", "Gloves"],
      },
      {
        name: "Football",
        variants: ["Footballs", "Shoes", "Jersey"],
      },
      {
        name: "Fitness",
        variants: ["Dumbbells", "Yoga Mats", "Resistance Bands"],
      },
    ],
  },

  {
    name: "Books",
    subcategories: [
      {
        name: "Academic",
        variants: ["Engineering", "Medical", "School Books"],
      },
      {
        name: "Fiction",
        variants: ["Novels", "Comics", "Short Stories"],
      },
      {
        name: "Non-Fiction",
        variants: ["Self-Help", "Biographies", "Business"],
      },
    ],
  },

  {
    name: "Toys",
    subcategories: [
      {
        name: "Kids Toys",
        variants: ["Soft Toys", "Action Figures", "Puzzles"],
      },
      {
        name: "Learning",
        variants: ["Educational Toys", "Science Kits"],
      },
    ],
  },

  {
    name: "Appliances",
    subcategories: [
      {
        name: "Large",
        variants: ["Refrigerator", "Washing Machine", "Air Conditioner"],
      },
      {
        name: "Small",
        variants: ["Geyser", "Mixer", "Iron Box"],
      },
    ],
  },

  {
    name: "Pet Supplies",
    subcategories: [
      {
        name: "Dogs",
        variants: ["Dog Food", "Leash", "Toys", "Shampoo"],
      },
      {
        name: "Cats",
        variants: ["Cat Food", "Litter", "Toys"],
      },
    ],
  },

  {
    name: "Automotive",
    subcategories: [
      {
        name: "Bike Accessories",
        variants: ["Helmets", "Gloves", "Covers"],
      },
      {
        name: "Car Accessories",
        variants: ["Seat Covers", "Car Perfume", "Vacuum Cleaner"],
      },
    ],
  },
];
