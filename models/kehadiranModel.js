const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');

const Kehadiran = sequelize.define('Kehadiran', {
    id_kehadiran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_krs: {
        type: DataTypes.INTEGER,
        references: {
            model: 'krs',
            key: 'id_krs'
        }
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('hadir', 'tidak hadir', 'izin', 'sakit'),
        allowNull: false,
    }
}, {
    tableName: 'kehadiran',
    timestamps: false,
});

module.exports = Kehadiran;
