const express = require('express')
const { getUser, registerUser } = require('../controller/userController')
const router = express.Router()

router.get('/', getUser)
router.post('/', registerUser)


module.exports = router