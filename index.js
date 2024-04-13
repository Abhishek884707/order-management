const express = require("express");
const orderRouter = require("./routes/orderRoute");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {connectMongoDb} = require("./connection")
const {logReqRes} = require("./midlewares/middleware_1")
// const bodyParser = require('body-parser');

const app = express();
const PORT = 8001;



// Swagger Option
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order Management APIs with Swagger",
            version: "1.0.0",
            description: "This RESTapi endpoints provides a Client Side Rendering for Order Management.",
            contact: {
                name: "Abhishek Mourya",
                email: "2021mt70042@wilp.bits-pilani.in.ac",
              },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Order Management Api Documentation"
            }
        ]
    },
    apis: ["./routes/*.js"]
};


const swaggerSpec = swaggerJsDocs(swaggerOptions);

// Serve Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/crud-app")
.then(() => console.log("MongoDb Connected"))
.catch((err) => console.log("Mongo Error" + err));

// MiddleWare - Plugin
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/orders", orderRouter);

app.listen(PORT, () => console.log(`Server Started at Port 8001`))