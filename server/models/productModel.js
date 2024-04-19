const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    englishName: {
      type: String,
      required: [true, "Please enter product name in English"],
    },
    myanmarName: {
      type: String,
      required: [true, "Please enter product name in Myanmar"],
    },
    mainCategory: {
      type: String,
      required: [true, "Please enter Food or Drink"],
    },
    subCategory1: {
      type: String,
      required: [true, "Please enter sub-category"],
    },
    subCategory2: {
      type: String,
      required: [false],
    },
    subCategory3: {
      type: String,
      required: [false],
    },
    category: {
      type: [String],
      required: [false],
    },
    price: {
      type: String,
      requied: [true, "Please enter a price"],
    },
    img: {
      type: String,
      required: [false, "Please provide image"],
    },
  },
  {
    timestamps: true,
  }
);

// ProductSchema.pre("save", function (next) {
//   const category = [];
//   if (this.sub_category1) {
//     category.push(this.sub_category1);
//   }
//   if (this.sub_category2) {
//     category.push(this.sub_category2);
//   }
//   if (this.sub_category3) {
//     category.push(this.sub_category3);
//   }
//   this.category = category;
//   next();
// });

// ProductSchema.pre("save", function (next) {
//   // Filter out undefined values and assign to the category field
//   const category = [
//     this.subCategory1,
//     this.subCategory2,
//     this.subCategory3,
//   ].filter(Boolean);
//   this.category = category;
//   next();
// });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
