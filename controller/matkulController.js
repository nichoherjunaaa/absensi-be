const MataKuliah = require('../models/matkulModel')
const asyncHandler = require('express-async-handler')

const createMatkul = asyncHandler(async (req, res) => {
    const { kode_mk, nama_mk, sks } = req.body
    const existingMatkul = await MataKuliah.findOne({ where: { kode_mk } })
    if (existingMatkul) {
        return res.status(400).json({ message: 'Mata Kuliah sudah terdaftar !' })
    }
    const matkul = await MataKuliah.create({
        kode_mk,
        nama_mk,
        sks
    })
    return res.status(201).json({
        data: matkul,
        message: "Success Create Matkul"
    })
})

const getAllMatkul = asyncHandler(async (req, res) => {
    res.send("Get All Matkul")
})

const getMatkulById = asyncHandler(async (req, res) => {
    res.send("Get Matkul By Id")
})

const updateMatkul = asyncHandler(async (req, res) => {
    res.send("Update Matkul")
})

const deleteMatkul = asyncHandler(async (req, res) => {
    res.send("Delete Matkul")
})

module.exports = {
    createMatkul,
    getAllMatkul,
    getMatkulById,
    updateMatkul,
    deleteMatkul
}