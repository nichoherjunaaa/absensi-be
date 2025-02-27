const express = require('express')
const { createMatkul, getAllMatkul, getMatkulById, deleteMatkul, updateMatkul } = require('../controller/matkulController')
const router = express.Router()

router.post('/', createMatkul)
router.get('/', getAllMatkul)
router.get('/:id', getMatkulById)
router.delete('/:id', deleteMatkul)
router.put('/:id', updateMatkul)

module.exports = router