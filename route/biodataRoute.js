const express = require('express')
const { createBiodata, getBiodataById, updateBiodata } = require('../controller/biodataController')

const router = express.Router()

router.post('/', createBiodata)
router.put('/:id', updateBiodata)
router.get('/:id', getBiodataById)

module.exports = router