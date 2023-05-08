const express = require('express');
const router = express.Router();
const orderController = require('./controllers/orderController');

// Map controller methods to RESTful endpoints
router.get('/orders', orderController.index);
router.get('/orders/:id', orderController.show);
router.post('/orders', orderController.create);
router.put('/orders/:id', orderController.update);
router.delete('/orders/:id', orderController.delete);

// Export the router
module.exports = router;