const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String
    }, 
}, {timestamps: true})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;