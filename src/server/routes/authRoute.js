const routes = require("express").Router();
const Joi = require("joi");

const userJoiSchema = require("../../joiSchemas/userSchema");
const sequelize = require("sequelize");
require("../../db/connectToDB");
const User = require("../../models/user");
const { encrypt, compare } = require("../../utilities/hashingFunctions");
const generateToken = require("../../utilities/generateToken");

//login end-point
routes.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let { error, value } = Joi.validate({ email, password }, userJoiSchema);
  if (error) res.status(400).send("Error in request" + error);

  //check if user is in db
  const userInDB = await User.findOne({ where: { email: value.email } });
  if (!userInDB) {
    res.status(400).send("User not found");
  } else {
    const storedPassword = userInDB.dataValues.password;
    if (!(await compare(value.password, storedPassword))) res.status(400).send("Email/Password do not match");
    else {
      res.status(200).send(generateToken({ id: userInDB.dataValues.id, email: userInDB.dataValues.email }));
    }
  }
});

//register end-point
routes.post("/register", async (req, res) => {
  let { email, password } = req.body;
  let { error, value } = Joi.validate({ email, password }, userJoiSchema);
  if (error) res.status(400).send("Error in request" + error);
  //check if user exists, if not, store to db with hashed password
  const userInDB = await User.findOne({ where: { email: value.email } });
  if (userInDB) {
    res.status(400).send("User is already present");
  } else {
    const hashedPassword = await encrypt(value.password);
    const newUser = await User.create({
      email: value.email,
      password: hashedPassword
    });
    //generate token and return response
    res.status(200).send(generateToken({ id: newUser.id, email: newUser.email }));
  }
});

module.exports = routes;
