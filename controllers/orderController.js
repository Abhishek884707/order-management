const Order = require("../models/order")

const OrderItems = require("../models/orderItems")

const Product = require("../models/product")

const User = require("../models/user")


async function handleGetAllOrders(req, res){
    const allDbOrders = await Order.find({});
    return res.status(200).json(allDbOrders);
}

async function handleGetOrderByUserId(req, res){
    const id = req.params.id;
    const allDbOrders = await Order.find({userId : id});
    if(!allDbOrders) return res.status(404).json({error: "Order not found!!!"});
    const dtoOrders = [];

    for (let order of allDbOrders) {
        dtoOrders.push(await appendUrlDetails(order));
    }

    appendUrlDetails
    return res.json(dtoOrders);
}

async function handleGetOrderDetailsByOrderId(req, res){
    const id = req.params.id;
    const allDbOrders = await OrderItems.find({orderId : id});
    if(!allDbOrders) return res.status(404).json({error: "Order not found!!!"});
    const dtoOrderItems = [];

    for (let order of allDbOrders) {
        dtoOrderItems.push(await appendProductDetails(order));
    }

    return res.json(dtoOrderItems);
}

// async function handleUpdateOrderById(req, res){
//     const updateOrder = req.body;
//     const Order = await Order.findByIdAndUpdate(req.params.id, {lastName: updateOrder.last_name});
//     return res.status(200).json({status: "success"});
// }

// async function handledeleteOrderById(req, res){
//     const Order = await Order.findByIdAndDelete(req.params.id);
//     return res.status(404).json({status: "success"});
// }

async function handleCreateNewOrder(req, res){
    const body = req.body;
    const customerId = req.params.id;

    console.log(body);

    if(!body||
        !body.products){
            return res.status(400).json({msg: "All fields are req...."});
        }

    if(!customerId){
        return res.status(403).json({msg: "plesse provide user Id"});
    }

        const user = await User.findById(customerId);

        if(!user){
            return res.status(404).json({msg : `Customer Not Exist with id : ${customerId}`})
        }

    const orderCreated = await Order.create({
        userId: customerId,
        status: "Pending"
    })

    const totalAmount = await handleCreateNewOrderItems(body.products, orderCreated.id);

    if(totalAmount !== 0){

        await Order.findByIdAndUpdate(orderCreated.id, {status: "Success"});
        return res.status(201).json({msg: "success", id: orderCreated._id});
    
    } else{
    
        return res.status(200).json({msg: "Error in Creting Order", id: orderCreated.id});
    
    }

}

async function handleCreateNewOrderItems(orderItems, orderId){
    let total = 0;
    for(let orderItem of orderItems){
        const product = await Product.findById(orderItem.product_id);
        console.log(orderItem.product_id);
        const cartPrice = orderItem.quantity * product.price;
        const orderCreated = await OrderItems.create({
            productId: orderItem.product_id,
            quantity: orderItem.qnatity,
            price: cartPrice,
            orderId: orderId,
        })
        total = total + product.price;
    }
    return total;
}

async function appendProductDetails(order){

    const ord = JSON.parse(JSON.stringify(order)); 

    const product = await Product.findById(order.productId);
    
    ord.product = product;

    return ord;

}

async function appendUrlDetails(order){

    const ord = JSON.parse(JSON.stringify(order)); 

    const url = {
        ref: `http://localhost:8001/api/orders/${order._id}/items`,
        description: "To see all list of items."
    }   
    ord.url = url;

    return ord;

}


module.exports = {
    handleGetAllOrders,
    handleGetOrderByUserId,
    handleGetOrderDetailsByOrderId,
    handleCreateNewOrder
}