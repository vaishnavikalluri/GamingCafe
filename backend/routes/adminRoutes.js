const express = require("express");
const router = express.Router();
const Admin = require("../models/adminSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roleAuth");

//signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isExists = await Admin.findOne({ email });
        if (isExists) {
            return res.status(409).json({ msg: "ACCOUNT ALREADY EXISTS!" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const new_admin = new Admin({ name, email, password: hashedPassword });
        await new_admin.save();
        res.status(200).json({ msg: "created admin" })
    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isPresent = await Admin.findOne({ email });
        if (!isPresent) {
            return res.status(404).json("NO ACCOUNT");
        }
        const isMatch = await bcryptjs.compare(password, isPresent.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Password doesn't match" });
        }
        const token = jwt.sign({ id: isPresent.id, role: isPresent.role }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(201).json({ msg: "Login successful", token, data: isPresent });

    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })
    }
});

//get all users
router.get("/all/users", auth, checkRole("admin"), async (req, res) => {
    try {
        const AllUsers = await User.find();
        if (AllUsers.length === 0) {
            return res.status(401).json({ msg: "NO USERS PRESENT" })
        }
        res.status(200).json({ msg: "All users data", data: AllUsers });
    } catch (error) {
        res.status(500).json("SERVER ERROR");
    }
});

// get users of premium type
router.get("/premium/users", auth, checkRole("admin"), async (req, res) => {
    try {

        const data = await User.find({ Membershiptype: "premium" });
        if (!data) {
            return res.status(404).json({ msg: "No data" });
        }
        res.status(201).json(data);

    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })

    }
});

// get normal users
router.get("/normal/users", auth, checkRole("admin"), async (req, res) => {
    try {
        const data = await User.find({ Membershiptype :"Normal" });
        if (!data) {
            return res.status(404).json({ msg: "No data" });
        }
        res.status(201).json(data);


    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })

    }
})

module.exports = router;