module.exports = (sequelize, DataTypes) => {
    const Kegiatan = sequelize.define("Kegiatan",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            jenisKegiatan: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            tanggal: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            kegiatan: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING(50),
                allowNull: false,
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
        },
        {
            sequelize,
            timestamps: true,
            modelName: "Kegiatan",
            tableName: "kegiatans",
        }
    );
    Kegiatan.associate = (models) => {
        Kegiatan.hasMany(models.Anggota, {
            foreignKey: "user_id",
            as: "anggota",
        });
        Kegiatan.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user"
        })
    };
    return Kegiatan;
};
