const Mahasiswa = require('../models/mahasiswaModel');
const asyncHandler = require('express-async-handler');
const getDataMahasiswa = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Success' });
});

const getDataById = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Success' });

});


const addDataMahasiswa = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Success' });

});

const updateDataMahasiswa = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Success' });

});

const deleteMahasiswa = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Success' });
});

module.exports = {
    getDataMahasiswa,
    getDataById,
    addDataMahasiswa,
    updateDataMahasiswa,
    deleteMahasiswa
}