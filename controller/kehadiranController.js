const Kehadiran = require('../models/kehadiranModel')

const createKehadiran = async (req, res) => {
    const {id, status} = req.body
    try {
        const kehadiran = await Kehadiran.create({
            id_krs: id,
            status
        })
        res.status(200).json(kehadiran)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}