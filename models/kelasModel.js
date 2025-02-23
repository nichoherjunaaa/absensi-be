const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');

const Kelas = sequelize.define('Kelas', {
    id_kelas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    kode_mk: {
        type: DataTypes.STRING(20),
        references: {
            model: 'mata_kuliah',
            key: 'kode_mk'
        }
    },
    nidn: {
        type: DataTypes.STRING(50),
        references: {
            model: 'dosen',
            key: 'nidn'
        }
    },
    semester: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    tahun_ajaran: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    jadwal: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
}, {
    tableName: 'kelas',
    timestamps: false,
});

module.exports = Kelas;
