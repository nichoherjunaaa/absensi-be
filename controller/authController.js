const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

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
    const userCount = await User.count();
    console.log('Total users:', userCount);

    const isOwner = userCount === 0;
    const role = isOwner ? 'admin' : 'client';

    req.body.role = role;

    const newUser = await User.create(req.body);

    createSendResToken(newUser, 201, res);
});

const loginUser = asyncHandler(async (req, res) => {
    const { nip_karyawan, password } = req.body;
    if (!nip_karyawan || !password) {
        res.status(400)
        throw new Error('Username dan Password dibutuhkan')
    }
    const userFound = await User.findOne({ where: { nip_karyawan } });

    if (userFound && (await userFound.comparePassword(password))) {
        createSendResToken(userFound, 200, res);
    } else {
        res.status(401)
        throw new Error('Username atau Password salah')
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(200).json({
        success: true,
        message: 'User Berhasil Logout'
    })
});

const getUserById = asyncHandler(async (req, res) => {
    const nipKaryawan = req.body.nip_karyawan;

    const userFound = await User.findByPk(nipKaryawan, {
        attributes: { exclude: ['password'] }
    });

    if (userFound) {
        res.json({ data: userFound });
    } else {
        res.status(404);
        throw new Error('User tidak ditemukan');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const nipKaryawan = req.params.nip_karyawan || req.body.nip_karyawan;
    const userFound = await User.findByPk(nipKaryawan);
    const allowedFields = [];
    const isAdmin = await User.findOne({ where: { role: 'admin', nip_karyawan: req.user.nip_karyawan } });
    if (!isAdmin && req.user.nip_karyawan !== nipKaryawan) {
        allowedFields.push('password', 'nama_lengkap', 'gender', 'alamat', 'nomor_telepon', 'photo', 'tanggal_lahir', 'tempat_lahir')
    } else {
        allowedFields.push('password', 'nama_lengkap', 'email', 'gender', 'tanggal_lahir', 'tempat_lahir', 'nomor_telepon', 'id_jabatan', 'alamat', 'photo')
    }
    const updateData = {};

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    }


    if (userFound) {
        await userFound.update(updateData);
        res.status(200).json({ message: 'User berhasil diperbarui', data: userFound });
    } else {
        res.status(404);
        throw new Error('User tidak ditemukan');
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        data: users
    })
})

const uploadPhoto = asyncHandler(async (req, res) => {
    const stream = cloudinary.uploader.upload_stream({
        folder: "profile",
        allowed_formats: ['jpg', 'png', 'jpeg'],

    },
        function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: 'gagal upload gambar !',
                    error: err
                });
            }
            res.json({
                message: 'Berhasil upload gambar!',
                url: result.secure_url,
            })
        })
    streamifier.createReadStream(req.file.buffer).pipe(stream);
})

module.exports = { registerUser, loginUser, getUserById, logoutUser, getAllUsers, updateUser, uploadPhoto };
