const express = require('express')
const { createDosen, getDosen, updateDosen, deleteDosen } = require('../controller/dosenController')
const router = express.Router()

router.post('/', createDosen)
router.get('/', getDosen)
router.put('/:id', updateDosen)
router.delete('/:id', deleteDosen);

module.exports = router