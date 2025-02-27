const MataKuliah = require('../models/matkulModel')
const asyncHandler = require('express-async-handler')
const createMatkul = asyncHandler(async (req, res) => {
    res.send("Create Matkul")
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