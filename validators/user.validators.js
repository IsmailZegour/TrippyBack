const {checkSchema, validationResult} = require('express-validator');
const UserRepository = require('../repositories/user.repository');
/**
 * Credential Validators
 */

const UserValidator = {
    validateRegister: [
        checkSchema({
            first_name: {
                escape: true,
                trim: true,
                notEmpty: { 
                    errorMessage: 'The field fist name must be filled'
                },
                isString: true,
                isLength: {
                    options:{min:1,max:50},
                    errorMessage: 'The first name must be at least 1 character long and less than 50'
                }
            },
            last_name: {
                escape: true,
                trim: true,
                notEmpty: { 
                    errorMessage: 'The field last name must be filled'
                },
                isString: true,
                isLength: {
                    options:{min:1,max:50},
                    errorMessage: 'The last name must be at least 1 character long and less than 50'
                }

            },
            username: {
                escape: true,
                trim: true,
                notEmpty: { 
                    errorMessage: 'The field username must be filled'
                },
                isString: true,
                isLength: {
                    options:{min:1,max:50},
                    errorMessage: 'The username must be at least 1 character long and less than 50'
                },
                options: async (value, {req, location, path}) => {
                    let unique = await UserRepository.isUsernameUnique(value);
                    if(unique == true) {
                        return true;
                    } else {
                        return Promise.reject("Username is already used");
                    }
                }
            },
            birth_date: {
                notEmpty: {
                    errorMessage: 'Birth date field must be filled!'
                },
                custom: {
                    options: (value, {req, location, path}) => {
                        if(isNaN(Date.parse(value))) {
                            throw new Error("Birth date field does not fit format");
                        } else {
                            return true;
                        }
                    }
                }
            },
            gender: {
                escape: true,
                notEmpty: { 
                    errorMessage: 'The field gender must be filled'
                },
                isString: true,
                isLength: {
                    options:{min:1,max:50},
                }
            },
            mail: {
                escape: true,
                isEmail: {
                    errorMessage: 'Email field does not fit email format'
                },
                notEmpty: {
                    errorMessage: 'Email field must be filled!'
                },
                custom: {
                    options: async (value, {req, location, path}) => {
                        let unique = await UserRepository.isMailUnique(value);
                        if(unique == true) {
                            return true;
                        } else {
                            return Promise.reject("Email is already used");
                        }
                    }
                }
            },
            password: {
                isString: true,
                isLength: {
                    options: {min: 5},
                    errorMessage: 'Password must be at lest 5 char. long!'
                }
            },
            password_confirmation: {
                isString: true,
                custom: {
                    options: (value, {req, location, path}) => {
                        if(req.body.password_confirmation !== req.body.password) {
                            throw new Error("password and confirmation don't fir");
                        } else {
                            return true;
                        }
                    }
                }
            }
        })
    ],
    validateLogin: [
        checkSchema({
            mail: {
                escape: true,
                trim: true,
                notEmpty: {
                    errorMessage: 'Email field must be filled'
                },
                isEmail: {
                    errorMessage: 'Email field does not fit email format'
                },
            },
            password: {
                isString: true,
                notEmpty: {
                    errorMessage: 'Password field must be filled'
                },
                isLength: {
                    options: {min: 5},
                    errorMessage: 'Password must be at lest 5 char. long!'
                }
            }
        })
    ]
};


module.exports = UserValidator;
