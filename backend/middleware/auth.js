const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{

const header = req.header("Authorization");
if(!header){
    return res.status(401).json({message: "No token provided"});
}

if(!header.startsWith("Bearer ")){
    return res.status(401).json({message: "Invalid token format"});
}

const token = header.split(" ")[1];

if(!token){
    return res.status(401).json({message: "No token provided"});
}

try {
    const verified =  jwt.verify(token,process.env.JWT_SECRET);
    req.user = verified;
    next();
} catch (error) {
    res.status(401).json({message: "Invalid token"});
}


};


module.exports = auth;
