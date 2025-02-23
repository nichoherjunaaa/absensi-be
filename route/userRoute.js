const express = require('express')
const { getUser, registerUser, loginUser, deleteUser, updateUser } = require('../controller/userController')
const router = express.Router()

router.get('/', getUser)
router.post('/', registerUser)
router.post('/login', loginUser)
router.delete('/:username', deleteUser)
router.put('/:username', updateUser)


module.exports = router