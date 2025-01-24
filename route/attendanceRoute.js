const express = require('express');
const { createAttendance, getAllAttendance } = require('../controller/attendanceController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, createAttendance)
router.get('/', authenticateToken, isAdmin, getAllAttendance)

module.exports = router;