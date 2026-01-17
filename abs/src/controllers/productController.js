const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    
    const product = await Product.create({
      name,
      price,
      category,
      quantity: stock
    });

    req.io.emit('stockUpdate', await Product.find());

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
