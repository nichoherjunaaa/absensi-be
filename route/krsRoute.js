const express = require('express')
const { getKrs, addKrs, updateKrs, deleteKrs, getKrsByUser } = require('../controller/krsController')
const { authenticateToken } = require('../middleware/authMiddleware')
const router = express.Router()


router.get('/', getKrs)
router.post('/', addKrs)
router.put('/:id', updateKrs)
router.delete('/:id', deleteKrs)
router.get('/:id', getKrsByUser)

module.exports = router