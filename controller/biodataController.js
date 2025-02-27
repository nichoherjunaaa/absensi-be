const Biodata = require('../models/biodataModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize');


const createBiodata = asyncHandler(async (req, res) => {
    const { username, email, nomor_telepon, tanggal_lahir, tempat_lahir, alamat, jenis_kelamin } = req.body;

    // Cek apakah user dengan username yang diberikan ada
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(400).json({ message: 'Pengguna tidak ditemukan!' });
    }

    // Cek apakah email atau nomor telepon sudah ada di database
    const existingBiodata = await Biodata.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { nomor_telepon: nomor_telepon },
                { username: username },
            ]
        }
    });

    if (existingBiodata) {
        return res.status(400).json({ message: 'Data sudah terdaftar!' });
    }

    const biodata = await Biodata.create({
        username,
        email,
        nomor_telepon,
        tanggal_lahir,
        tempat_lahir,
        alamat,
        jenis_kelamin
    });

    res.status(201).json({
        data: biodata,
        message: "Success create biodata!"
    });
});

const updateBiodata = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, nomor_telepon, tanggal_lahir, tempat_lahir, gender, alamat } = req.body;
    const biodata = await Biodata.findByPk(id);
    if (!biodata) {
        return res.status(404).json({
            message: "Data tidak ditemukan"
        })
    }
    biodata.email = email || biodata.email
    biodata.nomor_telepon = nomor_telepon || biodata.nomor_telepon
    biodata.tanggal_lahir = tanggal_lahir || biodata.tanggal_lahir
    biodata.tempat_lahir = tempat_lahir || biodata.tempat_lahir
    biodata.gender = gender || biodata.tempat_lahir
    biodata.alamat = alamat || biodata.alamat
    await biodata.save()

    res.status(200).json({
        message: "Biodata berhasil di update",
        data: biodata
    })

})

const getBiodataById = async (req, res) => {
    const { id } = req.params;
    const biodata = await Biodata.findByPk(id);
    if (!biodata) {
        return res.status(404).json({
            message: "Data tidak ditemukan"
        })
    }
    res.status(200).json({
        data: biodata,
        message: "Biodata ditemukan!"
    })
}

const getAllBiodata = asyncHandler(async(req,res) => {
    const biodata = await Biodata.findAll();
    if(!biodata){
        return res.status(404).json({
            message: "Tidak ada data !"
        })
    }
    res.status(200).json({
        data: biodata,
        message: "Success get all biodata"
    })
})

const deleteBiodata = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const biodata = await Biodata.findByPk(id);
    if(!biodata){
        return res.status(404).json({
            message: "Data tidak ditemukan !"
        })
    }
    await biodata.destroy();
    res.status(200).json({
        message: "Data berhasil dihapus"
    })
})

module.exports = {
    createBiodata, updateBiodata, getBiodataById, getAllBiodata, deleteBiodata
}