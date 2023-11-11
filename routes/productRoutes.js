const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/api/products', productController.getAllProducts);
router.get('/api/products/published', productController.getPublishedProducts);
router.get('/api/products/:id', productController.getProductById);

router.post('/api/products', productController.createProduct);

router.put('/api/products/:id', productController.updateProduct);

router.delete('/api/products/:id', productController.deleteProductById);
router.delete('/api/products', productController.deleteAllProducts);

module.exports = router;