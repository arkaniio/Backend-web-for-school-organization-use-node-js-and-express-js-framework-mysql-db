'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import manual model 
const AuthModel = require('../src/modules/auth/auth.model')(sequelize, Sequelize.DataTypes);
const AnggotaModel = require('../src/modules/anggota/anggota.model')(sequelize, Sequelize.DataTypes);
const InformationModel = require("../src/modules/informasi/information.model")(sequelize, Sequelize.DataTypes);
const KegiatanModel = require("../src/modules/kagiatan/kegiatan.model")(sequelize, Sequelize.DataTypes);
const AbsensiModel = require("../src/modules/absensi/absensi.model")(sequelize, Sequelize.DataTypes);
// Masukkan ke db object
db.User = AuthModel;
db.Anggota = AnggotaModel;
db.Information = InformationModel;
db.Kegiatan = KegiatanModel;
db.Absensi = AbsensiModel;

// Jalankan asosiasi (WAJIB setelah semua model di-assign)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
