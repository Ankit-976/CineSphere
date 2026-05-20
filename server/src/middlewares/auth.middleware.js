const prisma = require("../config/db");
const jwt = require('jsonwebtoken');

async function authAdminMiddleware(req, res, next) {
    
    const token = req.cookies.token 

    if (!token) {
        return res.status(401).json({message:"Please login first"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.role !== 'admin'){
            return res.status(403).json({message: "Access denied"})
        }

        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token"})
    }
}

async function authUserMiddleware(req, res, next) {
    
    const token = req.cookies.token 

    if (!token) {
        return res.status(401).json({message:"Please login first"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded

        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token"})
    }
}

module.exports = {
    authAdminMiddleware,
    authUserMiddleware
}