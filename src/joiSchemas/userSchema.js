const Joi = require("joi");

const userJoiSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .required()
    .email(),
  password: Joi.string()
    .trim()
    .required()
  // .regex(/^[a-zA-Z0-9]{6,16}$/)
});

module.exports = userJoiSchema;
