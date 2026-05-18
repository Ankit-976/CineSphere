const prisma = require("../config/db");
const jwt = require('jsonwebtoken');

async function authAdminMiddleware(req, res, next) {
    
    const token = req.cookies.token 

    if (!token) {
        return res.status(401).json({message:"Please login first"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const admin = await prisma.admin.findUnique({
            where: {id: decoded.id}
        })

        req.admin = admin

        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token"})
    }
}

module.exports = {
    authAdminMiddleware,
}