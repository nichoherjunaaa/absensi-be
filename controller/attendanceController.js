const { Op } = require('sequelize'); // Impor operator dari Sequelize
const Attendance = require('../models/attendanceModel');
const asyncHandler = require('express-async-handler');

const createAttendance = asyncHandler(async (req, res) => {
    const { status, nip_karyawan, surat_izin } = req.body;

    if (!status || !nip_karyawan) {
        res.status(400);
        throw new Error('Status dan NIP Karyawan diperlukan');
    }

    const today = new Date().toISOString().split('T')[0];

    const attendanceExists = await Attendance.findOne({
        where: {
            nip_karyawan,
            createdAt: {
                [Op.gte]: new Date(`${today}T00:00:00.000Z`), // Mulai dari awal hari ini
                [Op.lt]: new Date(`${today}T23:59:59.999Z`)  // Sampai akhir hari ini
            }
        }
    });

    if (attendanceExists) {
        res.status(400);
        throw new Error('Anda sudah melakukan presensi');
    }

    const newAttendance = await Attendance.create({
        status,
        nip_karyawan,
        surat_izin
    });

    res.status(201).json({
        success: true,
        data: newAttendance
    });
});

module.exports = { createAttendance };