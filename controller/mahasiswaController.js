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
    const { nim } = req.params;
    const mahasiswa = await Mahasiswa.findByPk(nim);

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
    const {nim} = req.params;
    const {nama, program_studi, angkatan } = req.body;

    const mhs = await Mahasiswa.findByPk(nim);

    if (!mhs) {
        return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }

    if (nama) mhs.nama = nama;
    if (program_studi) mhs.program_studi = program_studi;
    if (angkatan) mhs.angkatan = angkatan;

    await mhs.save();

    res.status(200).json({
        data : mhs,
        message: "Update Success",
    })
});

const deleteMahasiswa = asyncHandler(async (req, res) => {
    const {nim} = req.params;

    const mhs = await Mahasiswa.findByPk(nim);

    if (!mhs) {
        return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }

    await mhs.destroy();

    res.status(200).json({
        message: "Delete Success",
    })
});

module.exports = {
    getDataMahasiswa,
    getDataById,
    addDataMahasiswa,
    updateDataMahasiswa,
    deleteMahasiswa
}