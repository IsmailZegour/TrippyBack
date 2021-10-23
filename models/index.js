const dbConfig = require("../config/database");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//User model
db.user = require("./user.js")(sequelize, Sequelize);
//Relationship model
db.relationship = require("./relationships.js")(sequelize, Sequelize);
//Secret model
db.secret = require("./secret.js")(sequelize, Sequelize);
//Travel model
db.travel = require("./travel.js")(sequelize, Sequelize);
//Destination model
db.destination = require("./destination.js")(sequelize, Sequelize);
//Activity model
db.activity = require("./activity.js")(sequelize, Sequelize);
//Post model
db.post = require("./post.js")(sequelize, Sequelize);

//Table associations :
//User -> Secret
db.user.hasOne(db.secret, {foreignKey: {name: 'user_id', type: Sequelize.UUID}});
db.secret.belongsTo(db.user, {foreignKey: {name: 'user_id', type: Sequelize.UUID}});

//User -> Travel
db.user.hasMany(db.travel, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}});
db.travel.belongsTo(db.user, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}})

//User -> Destination
db.user.hasMany(db.destination, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}});
db.destination.belongsTo(db.user, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}});

//User -> Activity
db.user.hasMany(db.activity, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}});
db.activity.belongsTo(db.user, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}});

//User -> Post
db.user.hasMany(db.post, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}});
db.post.belongsTo(db.user, {foreignKey: {name: 'user_id', type: Sequelize.DataTypes.UUID}});

//Travel -> Destination
db.travel.hasMany(db.destination,{onDelete: 'SET NULL',foreignKey: {name: 'travel_id', type: Sequelize.DataTypes.UUID}});
db.destination.belongsTo(db.travel, {onDelete: 'SET NULL', foreignKey: {name: 'travel_id', type: Sequelize.DataTypes.UUID}});

//Travel -> Post
db.travel.hasMany(db.post, {onDelete: 'SET NULL', foreignKey: {name: 'travel_id', type: Sequelize.DataTypes.UUID}});
db.post.belongsTo(db.travel, {onDelete: 'SET NULL', foreignKey: {name: 'travel_id', type: Sequelize.DataTypes.UUID}});

//Travel -> Activity
db.travel.hasMany(db.activity, {onDelete: 'SET NULL', foreignKey: {name: 'travel_id', type: Sequelize.DataTypes.UUID}});
db.activity.belongsTo(db.travel, {onDelete: 'SET NULL', foreignKey: {name: 'travel_id', type: Sequelize.DataTypes.UUID}});

//Mongoose
const mongoose = require('../config/mongoose');
const chat = require('./chat');
const message = require('./message');
let Message = mongoose.model('message', message);
let Chat = mongoose.model('chat',chat);

db.chat = Chat;
db.message = Message;

module.exports = db;
