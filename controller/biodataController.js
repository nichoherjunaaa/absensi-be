const Biodata = require('../models/biodataModel')

const createBiodata = async (req, res) => {
    res.send('Create Biodata');
}

const updateBiodata = async (req, res) => {
    res.send('Update Biodata')
}

const getBiodataById = async (req, res) => {
    res.send('Get Biodata Id')
}

module.exports = {
    createBiodata, updateBiodata, getBiodataById
}