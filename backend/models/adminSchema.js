const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "admin"
    }
});

const Admin = mongoose.model("Admin",admin);

module.exports = Admin;