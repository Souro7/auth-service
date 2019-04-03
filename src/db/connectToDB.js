const Sequelize = require("sequelize");
const db = new Sequelize("movie-rental-auth", "postgres", "mysecretpassword", {
  host: "localhost",
  dialect: "postgres"
});

db.authenticate().then(console.log("connected to db"));

module.exports = db;
