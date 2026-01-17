const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, orderController.createOrder);
router.get('/', authenticate, orderController.getAllOrders);


module.exports = router;
