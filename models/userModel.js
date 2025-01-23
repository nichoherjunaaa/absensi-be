const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    nip_karyawan: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: 'client',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
    nama_lengkap: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    gender: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    tempat_lahir: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nomor_telepon: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    id_jabatan: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;