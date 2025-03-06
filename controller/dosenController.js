const Dosen = require('../models/dosenModel');
const User = require('../models/userModel'); // Import model User untuk validasi nidn
const asyncHandler = require('express-async-handler');

// Get All Dosen
const getDosen = asyncHandler(async (req, res) => {
    const dosen = await Dosen.findAll();
    res.status(200).json({
        data: dosen,
        message: "Success Get All Dosen",
    });
});

// Create Dosen
const createDosen = asyncHandler(async (req, res, next) => {
    try {
        const { nama, nidn, bidang_keahlian } = req.body;

        // Cek apakah nidn ada di tabel users sebelum insert (mencegah error FK)
        const user = await User.findOne({ where: { username: nidn } });
        if (!user) {
            return res.status(400).json({ message: 'NIDN tidak valid, pengguna tidak ditemukan' });
        }

        // Cek apakah Dosen sudah ada berdasarkan nidn atau nama
        const existingDosen = await Dosen.findOne({ where: { nidn } });
        if (existingDosen) {
            return res.status(400).json({ message: 'Dosen sudah terdaftar' });
        }

        // Buat data Dosen baru
        const dosen = await Dosen.create({
            nama,
            nidn,
            bidang_keahlian
        });

        res.status(201).json({
            data: dosen,
            message: "Success Create Dosen",
        });
    } catch (error) {
        next(error); // Kirim error ke middleware errorHandler
    }
});

// Update Dosen
const updateDosen = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nama, bidang_keahlian } = req.body;

        // Cari dosen berdasarkan ID
        const dosen = await Dosen.findByPk(id);
        if (!dosen) {
            return res.status(404).json({ message: "Dosen tidak ditemukan" });
        }
        
        // Update data dosen
        dosen.nama = nama || dosen.nama;
        dosen.bidang_keahlian = bidang_keahlian || dosen.bidang_keahlian;
        await dosen.save();

        res.status(200).json({
            data: dosen,
            message: "Success Update Dosen",
        });
    } catch (error) {
        next(error);
    }
});

// Delete Dosen
const deleteDosen = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        // Cari dosen berdasarkan ID
        const dosen = await Dosen.findByPk(id);
        if (!dosen) {
            return res.status(404).json({ message: "Dosen tidak ditemukan" });
        }

        // Hapus dosen
        await dosen.destroy();
        res.status(200).json({
            message: "Success Delete Dosen",
        });
    } catch (error) {
        next(error);
    }
});

const getDosenById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const dosen = await Dosen.findByPk(id);
    if(!dosen){
        return res.status(404).json({
            message: "Dosen tidak ditemukan"
        })
    }
    res.status(200).json({
        data: dosen,
        message: "Success Get Dosen By Id",
    });
})

module.exports = {
    getDosen,
    createDosen,
    updateDosen,
    deleteDosen,
    getDosenById
};
