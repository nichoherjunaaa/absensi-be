const Dosen = require('../models/dosenModel')

// Get All Dosen
const getDosen = async (req, res) => {
    res.send('Get Dosen')
}

// Create Dosen
const createDosen = async(req,res) => {
    res.send('Create Dosen')
}

// Update Dosen
const updateDosen = async(req,res) => {
    res.send('Update Dosen')
}

// Delete Dosen
const deleteDosen = async(req,res) => {
    res.send('Delete Dosen')
}

module.exports = {
    getDosen,
    createDosen,
    updateDosen,
    deleteDosen
}

