const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roleAuth");


//signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const isExists = await User.findOne({ email });
        if (isExists) {
            return res.status(409).json({ msg: "ACCOUNT ALREADY EXISTS!" });
        }
        if (!email || !password) {
            return res.status(400).json({ msg: "FIELDS REQUIRED" })
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const new_User = new User({ name, email, password: hashedPassword, phone });
        await new_User.save();
        res.status(200).json({ msg: "created user" })
    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isPresent = await User.findOne({ email });
        if (!isPresent) {
            return res.status(404).json("NO ACCOUNT");
        }
        if (!email || !password) {
            return res.status(400).json({ msg: " BOTH FIELDS REQUIRED" })
        }
        const isMatch = await bcryptjs.compare(password, isPresent.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Password doesn't match" });
        }
        const token = jwt.sign({ id: isPresent.id, role: isPresent.role }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(201).json({ msg: "Login successful", token , data: isPresent});

    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })
    }
});

//membership -post
router.post("/book",auth, async (req, res) => {
    try {
        const { name, email, phone, Membershiptype } = req.body;
        if (!name || !email || !phone || !Membershiptype) {
            return res.status(400).json({ msg: "ALL FIELDS REQUIRED" });
        }
        
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
            return res.status(404).json({ msg: "Account not found. Please signup first!" });
        }
        
        existingUser.name = name;
        existingUser.phone = phone;
        existingUser.Membershiptype = Membershiptype;
        await existingUser.save();
        res.status(200).json({ msg: "Membership updated successfully!" });

    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })

    }
});

//membership - update
router.put("/:id/change/membership", auth, checkRole("user"), async (req, res) => {
    try {
        const { id } = req.params;
        const change = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!change) {
            return res.status(401).json({ msg: "UNABLE TO UPDATE. TRY LATER" });
        }
        res.status(201).json({ msg: "UPDATED YOUR DATA", data: change });


    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })
    }
})

//membership- delete
router.delete("/:id/remove/membership", auth, checkRole("user"), async (req, res) => {
    try {
        const { id } = req.params;
        const remove = await User.findByIdAndDelete(id);
        if (!remove) {
            return res.status(400).json({ msg: "OOPS ! SORRY UNABLE TO DELETE. TRY LATER " })
        }
        res.status(200).json({ msg: "MEMBERSHIP DELETED" })
    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })
    }
})

// profile delete
router.delete("/profile/:id/delete", auth, checkRole("user"), async (req, res) => {
    try {
        const { id } = req.params;
        const profileRemove = await User.findByIdAndDelete(id);
        if (!profileRemove) {
            return res.status(400).json({ msg: "OOPS ! SORRY UNABLE TO DELETE. TRY LATER " })

        }
        res.status(200).json({ msg: "ACCOUNT DELETED" })

    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })

    }
})

// book a slot
router.post("/book/slot", auth, checkRole("user"), async (req, res) => {
    try {
        const { email, date, time, people } = req.body;
        if (!email || !date || !time || !people) {
            return res.status(400).json({ msg: "ALL FIELDS REQUIRED" });
        }
        
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
            return res.status(404).json({ msg: "Account not found. Please signup first!" });
        }
        
        existingUser.date = date;
        existingUser.time = time;
        existingUser.people = people;
        await existingUser.save();
        
        res.status(200).json({ msg: "BOOKED A SLOT SUCCESSFULLY", data: existingUser });
    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })

    }
})

// delete a slot
router.delete("/:id/remove/slot", auth, checkRole("user"), async (req, res) => {
    try {
        const { id } = req.params;
        const removeSlot = await User.findByIdAndDelete(id);
        if (!removeSlot) {
            return res.status(400).json({ msg: "UNABLE TO CANCEL SLOT . TRY AGAIN IN FEW MINUTES" })
        }
        res.status(201).json({ msg: "CANCELLED SLOT SUCCESSFULLY" })
    } catch (error) {
        res.status(500).json({ msg: "SERVER ERROR", error: error.message })
    }
})



module.exports = router;