const Order = require("../models/order-model")


const editOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    const status = req.body.status;

    try {
        // Update the status field of all products with the given orderId
        const result = await Order.updateMany({ orderId: orderId }, { $set: { orderStatus: status } });

        if (result.nModified > 0) {
            return res.status(201).json({ message: "Order status updated successfully" });
        } else {
            return res.status(404).json({ message: "No orders found with the given orderId" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getAllOrdersPhone = async (req, res) => {
    const phone = req.params.phone;
    const finalRes = [];

    try {
        const allOrders = await Order.find({ phone: phone });

        // Use an object to accumulate order details by order ID
        const ordersMap = {};

        allOrders.forEach(order => {
            const orderId = order.orderId;

            if (!ordersMap[orderId]) {
                ordersMap[orderId] = {
                    orderId: orderId,
                    orderStatus: order.orderStatus,
                    orderTotal: 0,
                    timeOfOrder: order.timeOfOrder
                };
            }

            // Accumulate order total
            ordersMap[orderId].orderTotal += order.amount;
        });

        // Convert ordersMap to an array
        for (const key in ordersMap) {
            finalRes.push(ordersMap[key]);
        }

        console.log(finalRes);
        return res.status(200).json(finalRes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = { editOrderById,getAllOrdersPhone};