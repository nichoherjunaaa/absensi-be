const express = require('express')
const { getAllKelas, getKelasByUser, updateKelas, createKelas, deleteKelas } = require('../controller/kelasController')
const router = express.Router()


router.get('/', getAllKelas)
router.get('/:id', getKelasByUser)
router.put('/', updateKelas)
router.post('/', createKelas)
router.delete('/:id', deleteKelas)

module.exports = router