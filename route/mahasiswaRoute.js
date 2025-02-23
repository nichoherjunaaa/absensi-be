const express = require('express')
const { getDataMahasiswa, getDataById, addDataMahasiswa, updateDataMahasiswa, deleteMahasiswa } = require('../controller/mahasiswaController')
const router = express.Router()

router.get('/', getDataMahasiswa);
router.get('/:username', getDataById);
router.post('/', addDataMahasiswa);
router.put('/:username', updateDataMahasiswa);
router.delete('/:username', deleteMahasiswa);

module.exports = router