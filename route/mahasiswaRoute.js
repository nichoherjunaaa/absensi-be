const express = require('express')
const { getDataMahasiswa, getDataById, addDataMahasiswa, updateDataMahasiswa, deleteMahasiswa } = require('../controller/mahasiswaController')
const router = express.Router()

router.get('/', getDataMahasiswa);
router.get('/:nim', getDataById);
router.post('/', addDataMahasiswa);
router.put('/:nim', updateDataMahasiswa);
router.delete('/:nim', deleteMahasiswa);

module.exports = router