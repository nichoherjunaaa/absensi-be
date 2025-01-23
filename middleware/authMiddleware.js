const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authenticateToken = asyncHandler(async (req, res, next) => {

});

const isAdmin = (req, res, next) => {

};

module.exports = { authenticateToken, isAdmin };
