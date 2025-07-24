const Product = require("../models/Product");

// @desc    Create a new product
// @route   POST /product
const createProduct = async (req, res) => {
  try {
    console.log(req.body)
    const newProduct = await Product.create({
      ...req.body,
      user: req.body.id, // support auth or manual pass
    });
    console.log(newProduct)
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all products
// @route   GET /product
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "email"); // optional populate
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete a product
// @route   DELETE /product/:id
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a product
// @route   PUT /product/:id
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {getAllProducts,createProduct,updateProduct,deleteProduct}