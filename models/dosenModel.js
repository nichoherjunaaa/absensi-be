const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');

const Dosen = sequelize.define('Dosen', {
    nidn: {
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
    bidang_keahlian: {
        type: DataTypes.JSON,
        allowNull: false,
    }
}, {
    tableName: 'dosen',
    timestamps: false,
});

module.exports = Dosen;
