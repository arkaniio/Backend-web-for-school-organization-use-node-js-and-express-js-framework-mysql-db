module.exports = (sequelize, DataTypes) => {
    const Information = sequelize.define("Information", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        judul: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        deskripsi: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        pembuat: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        kategori: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        tanggal: {
            type: DataTypes.NOW,
            allowNull: false
        },
        statusInformasi: {
            type: DataTypes.STRING(50),
            allowNull: false
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
        modelName: "Information",
        tableName: "informations"
    })
    Information.associate = (models) => {
        Information.hasMany(models.Anggota, {
            foreignKey: "user_id",
            as: "anggota"
        })
        Information.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "informasi"
        })
    }
    return Information
}