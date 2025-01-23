const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { validateRegisterInput, validateLoginInput } = require('../utils/userValidator');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user.nip_karyawan)
    const isDev = process.env.NODE_ENV === 'development' ? false : true

    const cookieOption = {
        expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        security: isDev
    }

    res.cookie('jwt', token, cookieOption)
    user.password = undefined
    res.status(statusCode).json({
        data: user
    })
}

const registerUser = asyncHandler(async (req, res) => {
    const isOwner = (await User.count()) === 0;
    const role = isOwner ? 'admin' : 'client';

    const newUser = await User.create({
        nip_karyawan: req.body.nip_karyawan,
        password: req.body.password,
        role: role,
        nama_lengkap: req.body.nama_lengkap,
        email: req.body.email,
        gender: req.body.gender,
        tanggal_lahir: req.body.tanggal_lahir,
        tempat_lahir: req.body.tempat_lahir,
        nomor_telepon: req.body.nomor_telepon,
        id_jabatan: req.body.id_jabatan,
        alamat: req.body.alamat
    });

    createSendResToken(newUser, 201, res);
});

const loginUser = asyncHandler(async (req, res) => {
    res.json({
        message: 'Login Berhasil',
    })
});

const logoutUser = asyncHandler(async (req, res) => {
    res.json({
        message: 'Logout Berhasil',
    })

});

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({
        message: 'Get User Berhasil',
    })
});

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser };
