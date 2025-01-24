const express = require('express');
const { createAttendance } = require('../controller/attendanceController');
const router = express.Router();

router.post('/', createAttendance)

module.exports = router;