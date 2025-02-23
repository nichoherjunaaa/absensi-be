const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');

const Mahasiswa = sequelize.define('Mahasiswa', {
    nim: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: 'username'
        }
    },
    nama: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    program_studi: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    angkatan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'mahasiswa',
    timestamps: false,
});

module.exports = Mahasiswa;
