const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect'); 
const User = require('../models/userModel'); // Import model User

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nip_karyawan: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: User, 
            key: 'nip_karyawan', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    tanggal: {
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'tanpa keterangan',
        validate: {
            isIn: [['hadir', 'tanpa keterangan', 'izin', 'terlambat']], 
        },
    },
    surat_izin: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'attendance',
    timestamps: true,
});

module.exports = Attendance;
