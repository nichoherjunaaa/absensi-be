const express = require('express')
const { createBiodata, getBiodataById, updateBiodata, getAllBiodata, deleteBiodata } = require('../controller/biodataController')

const router = express.Router()

router.post('/', createBiodata)
router.get('/', getAllBiodata)
router.put('/:id', updateBiodata)
router.get('/:id', getBiodataById)
router.delete('/:id', deleteBiodata)

module.exports = router