const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.get('/api/payments', paymentController.getAllPayments);
router.get('/api/payments/published', paymentController.getPublishedPayments);
router.get('/api/payments/:id', paymentController.getPaymentById);

router.post('/api/payments', paymentController.createPayment);

router.put('/api/payments/:id', paymentController.updatePayment);

router.delete('/api/payments/:id', paymentController.deletePaymentById);
router.delete('/api/payments', paymentController.deleteAllPayments);

module.exports = router;