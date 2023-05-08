const OrderService = require('../services/orderService');

const orderController = {
  // Get all orders
  index: async (req, res) => {
    try {
      const orders = await OrderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific order by ID
  show: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new order
  create: async (req, res) => {
    try {
      const orderData = req.body;
      const newOrder = await OrderService.createOrder(orderData.orderItems, orderData.totalPrice);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing order
  update: async (req, res) => {
    try {
      const orderId = req.params.id;
      const updatedOrderData = req.body;
      const updatedOrder = await OrderService.updateOrderStatus(orderId, updatedOrderData.status);
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete an order
  delete: async (req, res) => {
    try {
      const orderId = req.params.id;
      await OrderService.deleteOrder(orderId);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = orderController;
