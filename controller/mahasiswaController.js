const Mahasiswa = require('../models/mahasiswaModel');
const asyncHandler = require('express-async-handler');

const getDataMahasiswa = asyncHandler(async (req, res) => {
    const mahasiswa = await Mahasiswa.findAll();

    if (!mahasiswa || mahasiswa.length === 0) {
        return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }

    res.status(200).json({
        data: mahasiswa,
        message: "Success",
    });
});

const getDataById = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const mahasiswa = await Mahasiswa.findByPk(username);

    if (!mahasiswa) {
        return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }

    res.status(200).json({
        data: mahasiswa,
        message: "Success",
    });
});


const addDataMahasiswa = asyncHandler(async (req, res) => {
    const { nim, nama, program_studi, angkatan } = req.body;

    if (!nim || !nama || !program_studi || !angkatan) {
        return res.status(400).json({ message: 'Semua field harus diisi!' });
    }

    const existingMahasiswa = await Mahasiswa.findOne({ where: { nim } });
    if (existingMahasiswa) {
        return res.status(400).json({ message: 'NIM sudah terdaftar!' });
    }

    const mahasiswa = await Mahasiswa.create({ nim, nama, program_studi, angkatan });

    res.status(201).json({
        data: mahasiswa,
        message: "Success",
    });
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