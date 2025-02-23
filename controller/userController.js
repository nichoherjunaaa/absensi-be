const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const getUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.findAll();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            data: users,
            message: "Success",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const registerUser = asyncHandler(async (req, res) => {
    try {
        let { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Semua field harus diisi!' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password harus minimal 6 karakter!' });
        }

        const userCount = await User.count();
        if (userCount === 0) {
            role = 'admin';
        }

        const user = await User.create({ username, password, role });

        res.status(201).json({
            data: user,
            message: "User berhasil dibuat",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateUser = (req, res) => {
    res.send("Update User");
}

const deleteUser = (req, res) => {
    res.send("Delete User");
}

module.exports = {
    getUser,
    registerUser,
    updateUser,
    deleteUser
}
