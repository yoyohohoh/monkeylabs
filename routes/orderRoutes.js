const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/api/orders', orderController.getAllOrders);
router.get('/api/orders/published', orderController.getPublishedOrders);
router.get('/api/orders/:id', orderController.getOrderById);

router.post('/api/orders', orderController.createOrder);

router.put('/api/orders/:id', orderController.updateOrder);

router.delete('/api/orders/:id', orderController.deleteOrderById);
router.delete('/api/orders', orderController.deleteAllOrders);

module.exports = router;