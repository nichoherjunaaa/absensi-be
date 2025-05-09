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
    const matkul = await MataKuliah.findAll()
    if (matkul.length === 0) {
        return res.status(404).json({
            message: "Tidak ada data Mata Kuliah!"
        })
    }
    return res.status(200).json({
        data: matkul,
        message: "Success Get All Matkul"
    })
})

const getMatkulById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const matkul = await MataKuliah.findByPk(id)
    if (!matkul) {
        return res.status(404).json({
            message: "Data tidak ditemukan !"
        })
    }
    return res.status(200).json({
        data: matkul,
        message: "Mata Kuliah ditemukan"
    })
})

const updateMatkul = asyncHandler(async (req, res) => {
    const { id } = req.params
    const {nama_mk, sks } = req.body
    const matkul = await MataKuliah.findByPk(id)
    if (!matkul) {
        return res.status(404).json({
            message: "Data tidak ditemukan !"
        })
    }
    matkul.nama_mk = nama_mk || matkul.nama_mk
    matkul.sks = sks || matkul.sks
    await matkul.save()
    return res.status(200).json({
        data: matkul,
        message: "Success Update Matkul"
    })
})

const deleteMatkul = asyncHandler(async (req, res) => {
    const { id } = req.params
    const matkul = await MataKuliah.findByPk(id)
    if (!matkul) {
        return res.status(404).json({
            message: "Data tidak ditemukan !"
        })
    }
    await matkul.destroy()
    return res.status(200).json({
        message: "Data berhasil dihapus"
    })
})

module.exports = {
    createMatkul,
    getAllMatkul,
    getMatkulById,
    updateMatkul,
    deleteMatkul
}