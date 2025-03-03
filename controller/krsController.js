const KRS = require('../models/krsModel')

const addKrs = async (req, res) => {
    console.log(user);
    
    const { nim, id_kelas } = req.body
    const existingKRS = await KRS.findOne({ where: { nim, id_kelas } })
    if (existingKRS) {
        return res.status(400).json({ message: 'KRS sudah terdaftar !' })
    }
    const krs = await KRS.create({
        nim,
        id_kelas
    })
    res.status(201).json({
        data: krs,
        message: "KRS berhasil dibuat !"
    })
}

const getKrs = async (req, res) => {
    res.send('get krs')
}

const updateKrs = async (req, res) => {
    res.send('update krs')
}

const deleteKrs = async (req, res) => {
    res.send('delete krs')
}

const getKrsByUser = async (req, res) => {
    res.send('get krs by user')
}

module.exports = {
    addKrs,
    getKrs,
    updateKrs,
    deleteKrs,
    getKrsByUser
}