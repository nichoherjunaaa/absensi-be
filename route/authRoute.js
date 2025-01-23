const express = require('express');
const { registerUser, loginUser, logoutUser, getUserById, getAllUsers, updateUser } = require('../controller/authController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', authenticateToken, logoutUser)
router.get('/current/user', authenticateToken, getUserById);
router.get('/all-users', authenticateToken, isAdmin, getAllUsers);
router.put('/', authenticateToken, updateUser)
router.put('/update/:nip_karyawan', authenticateToken, isAdmin, updateUser)

module.exports = router;