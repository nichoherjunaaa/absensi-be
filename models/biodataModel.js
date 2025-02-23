const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');

const Biodata = sequelize.define('Biodata', {
    id_biodata: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'users',
            key: 'username'
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    nomor_telepon: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    tempat_lahir: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tanggal_lahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    jenis_kelamin: {
        type: DataTypes.ENUM('laki-laki', 'perempuan'),
        allowNull: false,
    }
}, {
    tableName: 'biodata',
    timestamps: false,
});

module.exports = Biodata;
