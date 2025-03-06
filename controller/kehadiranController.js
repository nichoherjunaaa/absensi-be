const Kehadiran = require('../models/kehadiranModel')
const { Op } = require('sequelize');

const createKehadiran = async (req, res) => {
    try {
        const { id_krs, status } = req.body;
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

        // Cek apakah sudah ada presensi untuk id_krs di tanggal hari ini
        const isPresent = await Kehadiran.findOne({
            where: {
                id_krs,
                tanggal: {
                    [Op.eq]: today // Cari data dengan tanggal hari ini
                }
            }
        });

        if (isPresent) {
            return res.status(400).json({ message: "Presensi hari ini sudah dilakukan!" });
        }

        // Jika belum ada, buat data presensi baru
        const kehadiran = await Kehadiran.create({
            id_krs,
            tanggal: today, // Simpan tanggal hari ini
            status
        });

        res.status(201).json({
            message: "Presensi berhasil",
            data: kehadiran,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getKehadiran = async (req, res) => {
    res.send('get kehadiran')
}

const updateKehadiran = async (req, res) => {
    res.send('update kehadiran')
}

const deleteKehadiran = async (req, res) => {
    res.send('delete kehadiran')
}

module.exports = {
    createKehadiran,
    getKehadiran,
    updateKehadiran,
    deleteKehadiran
}