const checkRole = (...allowedRoles) =>{
    return (req,res,next) => {
        if(!req.user){
            return res.status(401).json({msg:"Login first"});
        }

        const userRole = req.user.role;
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({msg:"No access"});
        }
        next();

    };
};

module.exports = checkRole;
