const express = require('express')
const { getKehadiran, createKehadiran, updateKehadiran, deleteKehadiran } = require('../controller/kehadiranController')
const router = express.Router()

router.get('/', getKehadiran)
router.post('/', createKehadiran)
router.put('/', updateKehadiran )
router.delete('/', deleteKehadiran)

module.exports = router