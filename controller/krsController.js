const KRS = require('../models/krsModel')


// Create KRS
const addKrs = async (req, res) => {
    // console.log(user);
    const { nim, id_kelas, semester, tahun_ajaran } = req.body
    const existingKRS = await KRS.findOne({ where: { nim, id_kelas } })
    if (existingKRS) {
        return res.status(400).json({ message: 'KRS sudah terdaftar !' })
    }
    const krs = await KRS.create({
        nim,
        id_kelas,
        semester,
        tahun_ajaran

    })
    res.status(201).json({
        data: krs,
        message: "KRS berhasil dibuat !"
    })
}

const getKrs = async (req, res) => {
    const krs = await KRS.findAll()
    if (krs.length === 0) {
        return res.status(404).json({
            message: "Tidak ada data KRS!"
        })
    }
    res.status(200).json({
        data: krs,
        message: "Berhasil mengambil data KRS !"
    })
}

const updateKrs = async (req, res) => {
    res.send('update krs')
}

const deleteKrs = async (req, res) => {
    // res.send('delete krs')
    const { id } = req.params
    const krs = await KRS.findByPk(id)
    if (!krs) {
        return res.status(404).json({
            message: "Data tidak ditemukan !"
        })
    }
    await krs.destroy()
    res.status(200).json({
        message: "Data berhasil dihapus"
    })
}

const getKrsByUser = async (req, res) => {
    const { id } = req.params
    const krs = await KRS.findAll({ where: { nim :id } })
    if (krs.length === 0) {
        return res.status(404).json({
            message: "Tidak ada data KRS!"
        })
    }
    res.status(200).json({
        data: krs,
        message: "Berhasil mengambil data KRS !"
    })
}

module.exports = {
    addKrs,
    getKrs,
    updateKrs,
    deleteKrs,
    getKrsByUser
}