module.exports = (sequelize, DataTypes) => {
    const Absensi = sequelize.define("Absensi", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        namaAnggota: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        kelas: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        kelasDiMac: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        tanggal: {
            type: DataTypes.NOW,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
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
    });
    Absensi.associate = (models) => {
        Absensi.hasMany(models.Anggota, {
            foreignKey: "user_id",
            as: "anggota",
        });
        Absensi.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "absensi"
        })
    };
    return Absensi;
};
