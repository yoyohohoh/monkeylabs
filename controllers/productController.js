const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  var keyword = req.query.name;

  if (keyword == null) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else {
    try {
      keyword = keyword.replace('[', '').replace(']', '').trim();
      const products = await Product.find({
        name: { $regex: keyword, $options: 'i' }
      });

      res.status(200).json(products);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching products.' });
    }
  }
};

const getPublishedProducts = async (req, res) => {
  try {
    const publishedProducts = await Product.find({ published: true });
    res.status(200).json(publishedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching published products.' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching product.' });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, published, category } = req.body;

    if (!name || !description || price === undefined || published === undefined || !category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            published,
            category
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding product.' });
    }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });
      
      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found.' });
      }

      res.status(200).json(updatedProduct);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating product.' });
  }
};

const deleteProductById = async (req, res) => {
  const productId = req.params.id;

  try {
      const product = await Product.findByIdAndDelete(productId);
      
      if (!product) {
          return res.status(404).json({ message: 'Product not found.' });
      }

      res.status(200).json({ message: 'Product successfully deleted.', deletedProduct: product });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting product.' });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
      const products = await Product.deleteMany({});
      res.status(200).json({ message: 'All products successfully deleted.', deletedProducts: products });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting products.' });
  }
};

module.exports = {
  getAllProducts,
  getPublishedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  deleteAllProducts
}