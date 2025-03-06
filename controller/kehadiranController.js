const Kehadiran = require('../models/kehadiranModel')

const createKehadiran = async (req, res) => {
    res.send('create kehadiran')
}

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