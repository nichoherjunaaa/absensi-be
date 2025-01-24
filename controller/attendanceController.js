const { Op } = require('sequelize'); // Impor operator dari Sequelize
const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createAttendance = asyncHandler(async (req, res) => {
    const { status, surat_izin } = req.body;

    const { nip_karyawan } = req.user

    if (!status || !nip_karyawan) {
        res.status(400);
        throw new Error('Status dan NIP Karyawan diperlukan');
    }

    const userFound = await User.findByPk(nip_karyawan);
    if (!userFound) {
        res.status(404);
        throw new Error('Karyawan tidak ditemukan');
    }

    const today = new Date().toISOString().split('T')[0];

    const attendanceExists = await Attendance.findOne({
        where: {
            nip_karyawan,
            createdAt: {
                [Op.gte]: new Date(`${today}T00:00:00.000Z`),
                [Op.lt]: new Date(`${today}T23:59:59.999Z`)
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

const getAllAttendance = asyncHandler(async (req, res) => {
    const allAttendance = await Attendance.findAll();
    res.status(200).json({
        success: true,
        data: allAttendance
    });
});

module.exports = { createAttendance, getAllAttendance };