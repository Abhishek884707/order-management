const express = require("express");

const router = express.Router();

const {handleGetAllOrders,
    handleGetOrderByUserId,
    handleCreateNewOrder,
    handleGetOrderDetailsByOrderId} = require("../controllers/orderController")

    
    // REST APIs
    router.route("/:id")
    /**
     * @swagger
     * /api/Orders/{id}:
     *  get:
     *     summery: Get Order by Id.
     *     tags: [Fetch]
     *     description: Retrieve a Order by id.
     *     parameters:
     *          - id: id
     *            in: path
     *            description: the id of the Order.
     *            require: true
     *            schema:
     *              type: string
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    .get(handleGetOrderByUserId)
    /**
     * @swagger
     * /api/Orders:
     *  post:
     *      summery: Create a new Order.
     *      tags: [Create]
     *      description: Enter required all perameters to add new Order in database.
     *      requestBody:
     *          require: true
     *          content: 
     *              application/json:
     *              schema:
     *                  type: object
     *                  properties:
     *                      first_name:
     *                              type: string
     *                      last_name:
     *                              type: string
     *                      email:
     *                              type: string
     *                      job_title:
     *                              type: string
     *                      gender:
     *                             type: string  
     *                  example:
     *                      first_name: Abhishek
     *                      last_name: Kumar Mourya
     *                      email: abhishek.mourya@gmail.com
     *                      job_title: Software dev
     *                      gender: Male
     *      responses:
     *          200:
     *              description: Successfully created a new Order.
     *          400:
     *              description: All fields are required.
     *          500:
     *              description: Some Server Error.
     */
    .post(handleCreateNewOrder);

    router.route("/:id/items")
    .get(handleGetOrderDetailsByOrderId)

    
    router.route("/")
    /**
     * @swagger
     * /api/Orders:
     *  get:
     *      summery: Get a list of Orders.
     *      tags: [Fetch]
     *      description: Retrieve a list of Orders.
     *      responses:
     *         200:
     *            description: A List of Orders. 
     */
    .get(handleGetAllOrders);


    module.exports = router;