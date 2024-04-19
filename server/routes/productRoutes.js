const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  createNewProducts,
  updateSingleProduct,
  deleteSingleProduct,
} = require("../controller/productController");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// Route to create new products
router.post("/", upload.single("file"), createNewProducts);

// Route to get all products from database
router.get("/", getAllProducts);

// Route to get one product from database
router.get("/:id", getSingleProduct);

// Route to update a single product
router.put("/:id", upload.single("file"), updateSingleProduct);

// Route to delete a single product
router.delete("/:id", deleteSingleProduct);

module.exports = router;
