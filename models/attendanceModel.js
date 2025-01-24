const { DataTypes } = require('sequelize');

const Attendance = sequalize.define('Attendance', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    surat_izin : {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'attendance',
    timestamps: true,
    createdAt: 'created_at',
});

module.exports = Attendance;