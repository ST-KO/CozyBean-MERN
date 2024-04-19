const Product = require("../models/productModel");
const fs = require("fs");
const path = require("path");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// const createNewProducts = async (req, res) => {
//   try {
//     if (
//       !req.body.title ||
//       !req.body.title1 ||
//       !req.body.main_category ||
//       !req.body.price
//     ) {
//       return res
//         .status(400)
//         .send({ message: "Please provide required fileds" });
//     }
//     const newProduct = await Product.create(req.body);
//     res.status(200).json(newProduct);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

const createNewProducts = async (req, res) => {
  try {
    const { subCategory1, subCategory2, subCategory3 } = req.body;
    const category = [subCategory1, subCategory2, subCategory3].filter(Boolean);

    let img;
    if (req.file) {
      img = req.file.filename;
    } else {
      img = "";
    }

    const newProduct = await Product.create({
      ...req.body,
      category,
      img,
    });
    res.status(200).json(newProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

// const updateSingleProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(404).send({ message: `No task with id: ${id}` });
//     }
//     const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

const updateSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: `No task with id: ${id}` });
    }

    // Retrieving existing product to get the old image filename
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .send({ message: `Product not found with id: ${id}` });
    }

    // Store the old image file
    const oldImageFilename = existingProduct.img;

    // Delete the old image file
    if (oldImageFilename) {
      const imagePath = path.join(
        __dirname,
        "../public/images",
        oldImageFilename
      );

      // Check if image file is provided and the file exists
      if (req.file && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Update the product with new data
    const { subCategory1, subCategory2, subCategory3 } = req.body;
    const category = [subCategory1, subCategory2, subCategory3].filter(Boolean);

    let img;
    if (req.file) {
      img = req.file.filename;
    } else {
      img = existingProduct.img;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body, category, img },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieving existing product to get the old image filename
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .send({ message: `Product not found with id: ${id}` });
    }

    // Store the old image file
    const oldImageFilename = existingProduct.img;

    // Delete the old image file
    if (oldImageFilename) {
      const imagePath = path.join(
        __dirname,
        "../public/images",
        oldImageFilename
      );

      // Check if image file is provided and the file exists
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Product is not found" });
    }
    res.status(200).send({ message: "Successfully deleted product" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createNewProducts,
  updateSingleProduct,
  deleteSingleProduct,
};
