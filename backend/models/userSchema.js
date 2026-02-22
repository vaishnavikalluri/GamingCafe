const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    people: {
        type: Number
    },
    Membershiptype: {
        type: String,
        enum: ["premium", "Normal"],
        default: "Normal"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

const User = mongoose.model("User", user);

module.exports = User;