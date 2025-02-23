const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');

const MataKuliah = sequelize.define('MataKuliah', {
    kode_mk: {
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    nama_mk: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    sks: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'mata_kuliah',
    timestamps: false,
});

module.exports = MataKuliah;
