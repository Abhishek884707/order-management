const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema({
    productId: {
        type: String,
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number,
    },
    orderId: {
        type: String,
    },
}, {timestamps: true})

const OrderItems = mongoose.model('orderItems', orderItemsSchema);

module.exports = OrderItems;