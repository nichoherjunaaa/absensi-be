const express = require('express')
const { getUser, registerUser, loginUser } = require('../controller/userController')
const router = express.Router()

router.get('/', getUser)
router.post('/', registerUser)
router.post('/login', loginUser)


module.exports = router