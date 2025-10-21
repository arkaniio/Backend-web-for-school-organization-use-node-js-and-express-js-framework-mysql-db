module.exports = (sequelize, DataTypes) => {
    const Anggota = sequelize.define("Anggota", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        kelas: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        umur: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        alasan: {
            type: DataTypes.STRING(225),
            allowNull: false
        },
        tanggal: {
            type: DataTypes.DATE,
            allowNull: false
        },
        statusPendaftaran: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        timestamps: true,
        modelName: "Anggota",
        tableName: "anggotas"
    });
    Anggota.associate = (models) => {
        Anggota.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        })
        Anggota.belongsTo(models.Information, {
            foreignKey: "user_id",
            as: "informasi"
        })
        Anggota.belongsTo(models.Kegiatan, {
            foreignKey: "user_id",
            as: "kegiatan"
        })
        Anggota.belongsTo(models.Absensi, {
            foreignKey: "user_id",
            as: "absensi"
        })
    }
    return Anggota;
}