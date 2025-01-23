const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const authenticateToken = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });
            if (req.user) {
                next();
            } else {
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token provided')
    }
});

const isAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Not authenticated, please log in');
        return;
    }

    if (req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403);
        throw new Error('Forbidden, you do not have admin privileges');
        return;
    }
};

module.exports = { authenticateToken, isAdmin };
