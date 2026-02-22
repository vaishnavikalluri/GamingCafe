require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db");

app.use(express.json());
connect();

const UserRoutes = require("./routes/userRoutes");
app.use("/user/api", UserRoutes);

const AdminRoutes = require("./routes/adminRoutes");
app.use("/admin/api",AdminRoutes);


app.get("/",(req,res)=>{
    res.send("hello");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
