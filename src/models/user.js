"use strict";

const db = require("../db/connectToDB");
const Sequelize = require("sequelize");

const User = db.define("users", {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = User;
