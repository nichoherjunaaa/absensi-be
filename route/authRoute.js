const express = require('express');
const {registerUser, loginUser,logoutUser, getCurrentUser } = require('../controller/authController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/current/user   ', getCurrentUser);  

module.exports = router;