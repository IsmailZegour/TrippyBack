const { Joi } = require("express-validation");
/**
 * Credential Validators
 */

const MusicValidators = {
  validateRegister: {
    body: Joi.object({
      first_name: Joi.string().max(80).required(),
      last_name: Joi.string().max(80).required(),
      username: Joi.string().max(80).required(),
      birth_date: Joi.string().max(12).required(),
      gender: Joi.string().max(10).required(),
      mail: Joi.string().max(80).required(),
      password: Joi.string().max(80).required(),
      password_confirmation: Joi.string().max(80).required(),
    }),
  },
  validateLogin: {
    body: Joi.object({
      mail: Joi.string().max(80).required(),
      password: Joi.string().max(80).required(),
    }),
  },
};

module.exports = MusicValidators;
