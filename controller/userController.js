const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Get All Users
const getUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.status(200).json({
            data: users,
            message: "Success",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register User
const registerUser = asyncHandler(async (req, res) => {
    try {
        let { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Semua field harus diisi!' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password harus minimal 6 karakter!' });
        }

        // Cek apakah user pertama jadikan admin
        const userCount = await User.count();
        if (userCount === 0) {
            role = 'admin';
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username sudah digunakan!' });
        }
        
        const user = await User.create({ username, password, role });

        res.status(201).json({
            data: {
                username: user.username,
                role: user.role,
            },
            message: "User berhasil dibuat",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username dan password harus diisi!' });
        }

        // Cari user di database
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'User tidak ditemukan' });
        }

        // Cek password dengan metode dari model
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Username atau Password salah' });
        }

        res.status(200).json({
            data: {
                username: user.username,
                role: user.role,
            },
            token: generateToken(user.id),
            message: "Login berhasil",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
    try {
        const { username } = req.params;
        const { password } = req.body;
        console.log(username);

        // Cek apakah user ada
        const user = await User.findByPk(username);
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        

        // Update data (hanya yang diberikan)
        if (password) user.password = password;

        await user.save();

        res.status(200).json({
            data: {
                username: user.username,
                role: user.role,
            },
            message: "Password berhasil diperbarui",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { username } = req.params;
        console.log(username);
        // Cek apakah user ada
        const user = await User.findByPk(username);
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        await user.destroy();

        res.status(200).json({ message: "User berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};
