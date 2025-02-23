const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqlConnect');

const KRS = sequelize.define('KRS', {
    id_krs: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nim: {
        type: DataTypes.STRING(50),
        references: {
            model: 'mahasiswa',
            key: 'nim'
        }
    },
    id_kelas: {
        type: DataTypes.INTEGER,
        references: {
            model: 'kelas',
            key: 'id_kelas'
        }
    }
}, {
    tableName: 'krs',
    timestamps: false,
});

module.exports = KRS;
