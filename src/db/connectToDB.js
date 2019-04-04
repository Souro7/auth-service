const Sequelize = require("sequelize");

require("../config/config");

const database = process.env.database;
const user = process.env.username;
const password = process.env.password;
const host = process.env.host;
const dialect = process.env.dialect;

const db = new Sequelize(database, user, password, {
  host: host,
  dialect: dialect
});

db.authenticate().then(console.log("connected to db"));

module.exports = db;
