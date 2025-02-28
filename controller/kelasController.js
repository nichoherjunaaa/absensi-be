const Kelas = require('../models/kelasModel')
const asyncHandler = require('express-async-handler')
const getAllKelas = asyncHandler(async (req, res) => {
    const kelas = await Kelas.findAll()
    if (kelas.length === 0) {
        return res.status(404).json({
            message: "Tidak ada data Kelas!"
        })
    }
    res.status(200).json({
        data: kelas,
        message: "Success Get All Kelas"
    })
})

const updateKelas = async (req, res) => {
    const { id } = req.params
    const {kode_mk, nidn, semester, tahun_ajaran, jadwal } = req.body
    const kelas = await Kelas.findByPk(id)
    if (!kelas) {
        return res.status(404).json({
            message: "Data tidak ditemukan !"
        })
    }
    kelas.kode_mk = kode_mk || kelas.kode_mk
    kelas.nidn = nidn || kelas.nidn
    kelas.semester = semester || kelas.semester
    kelas.tahun_ajaran = tahun_ajaran || kelas.tahun_ajaran
    kelas.jadwal = jadwal || kelas.jadwal
    kelas.save()
    res.status(200).json({
        data: kelas,
        message: "Kelas berhasil diupdate !"
    })

}

const deleteKelas = async (req, res) => {
    res.send('deleteKelas')
}

const createKelas = async (req, res) => {
    const { kode_mk, nidn, semester, tahun_ajaran, jadwal } = req.body
    const existingKelas = await Kelas.findOne({ where: { kode_mk, nidn, semester, tahun_ajaran } })
    if (existingKelas) {
        return res.status(400).json({ message: 'Kelas sudah terdaftar !' })
    }
    const kelas = await Kelas.create({
        kode_mk,
        nidn,
        semester,
        tahun_ajaran,
        jadwal
    })
    res.status(201).json({
        data: kelas,
        message: "Kelas berhasil dibuat !"
    })
}

const getKelasByUser = async (req, res) => {
    res.send('getKelasByUser')
}

module.exports = { getAllKelas, updateKelas, deleteKelas, createKelas, getKelasByUser }