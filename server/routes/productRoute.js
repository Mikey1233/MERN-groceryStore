const express = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

// You can protect these routes with middleware if needed (e.g., isAuthenticated)

router.post("/", createProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
