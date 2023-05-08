const {
    Order,
    Food,
    OrderFood
} = require('../models');
const {
    Op
} = require('sequelize');

class OrderService {
    // Method to create a new order
    async createOrder(orderItems, totalPrice) {
        try {
            // Retrieve food items from the database
            const foodIds = orderItems.map((item) => item.foodId);
            const existingFoods = await Food.findAll({
                where: {
                    id: {
                        [Op.in]: foodIds,
                    },
                },
            });

            // Check if the food items are valid or not 
            if (existingFoods.length !== foodIds.length) {
                throw new Error('Invalid food items.');
            }

            // Calculate the total price of the order
            const calculatedPrice = existingFoods.reduce((acc, curr) => {
                const item = orderItems.find(item => item.foodId === curr.id);
                return acc + curr.itemPrice * item.quantity;
            }, 0);

            // Compare the calculated price with the total price provided by the user
            if (calculatedPrice !== totalPrice) {
                throw new Error('Invalid total price.');
            }

            // Create a new order in the database
            const order = await Order.create({
                orderItems,
                totalPrice,
                status: 'pending'
            });

            // Create the order-food associations in the OrderFood table
            const orderFoodItems = orderItems.map((item) => ({
                OrderId: order.id,
                FoodId: item.foodId,
                quantity: item.quantity,
            }));
            await OrderFood.bulkCreate(orderFoodItems);

            return order;
        } catch (err) {
            // Handle any errors during the creation of the order
            console.error(err);
            throw new Error('Failed to create order.');
        }
    }

    // Method to get an order by its ID
    async getOrderById(orderId) {
        try {
            // Retrieve the order by ID and include associated food items
            const order = await Order.findOne({
                where: {
                    id: orderId
                }
            });

            if (!order) {
                throw new Error('Order not found.');
            }

            return order;
        } catch (err) {
            // Handle any errors during the retrieval of the order
            console.error(err);
            throw new Error('Order not found.');
        }
    }

    // Method to get all orders
    async getAllOrders() {
        try {
            // Retrieve all orders
            const orders = await Order.findAll();
            return orders;
        } catch (err) {
            // Handle any errors during the retrieval of orders
            console.error(err);
            throw new Error('Failed to retrieve orders.');
        }
    }

    // Method to update an order status
    async updateOrderStatus(orderId, status) {
        try {
            // Update the status of the order
            const updatedOrder = await Order.update({
                status
            }, {
                where: {
                    id: orderId
                }
            });

            if (updatedOrder[0] === 0) {
                throw new Error('Order not found.');
            }

            return updatedOrder;
        } catch (err) {
            // Handle any errors during the update of the order
            console.error(err);
            throw new Error('Failed to update order status.');
        }
    }

    // Method to delete an order
    async deleteOrder(orderId) {
        try {
            // Find the order by ID
            const order = await Order.findOne({
                where: {
                    id: orderId
                },
            });

            // If the order doesn't exist, return error
            if (!order) {
                throw new Error('Order not found.');
            }

            // Delete the order
            await order.destroy();

            return order;
        } catch (err) {
            // Handle any errors during the update of the order
            console.error(err);
            throw new Error('Failed to update order status.');
        }
    }
}

module.exports = new OrderService();
