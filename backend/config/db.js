const mongoose = require("mongoose");

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected");
    } catch (error) {
        console.log("failed to connect");
    }
}
module.exports = connect;