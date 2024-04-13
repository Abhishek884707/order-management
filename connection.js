const mongoose = require("mongoose");

async function connectMongoDb(url){
    mongoose.connect(url);
    // mongoose.connect("mongodb://127.0.0.1:27017/crud-app");
// .then(() => console.log("MongoDb Connected"))
// .catch((err) => console.log("Mongo Error" + err));
}

module.exports = {
    connectMongoDb,
}