module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false
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
        modelName: "User",
        tableName: "users"
    });
    User.associate = (models) => {
        User.hasMany(models.Anggota, {
            foreignKey: "user_id",
            as: "anggota",
        })
        User.hasMany(models.Information, {
            foreignKey: "user_id",
            as: "informasi"
        })
        User.hasMany(models.Kegiatan, {
            foreignKey: "user_id",
            as: "kegiatan"
        })
        User.hasMany(models.Absensi, {
            foreignKey: "user_id",
            as: "absensi"
        })
    }
    return User;
};
