const express = require('express');
const router = express.Router();
const orderController = require('./controllers/orderController');

router.get('/orders', orderController.index);
router.get('/orders/:id', orderController.show);
router.post('/orders', orderController.create);
router.put('/orders/:id', orderController.update);
router.delete('/orders/:id', orderController.delete);

module.exports = router;
