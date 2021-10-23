//const { Joi } = require("express-validation");
const {check, validationResult} = require('express-validator');
/**
 * Credential Validators
 */

const ContentValidators = {
    validateTravel: [
        check("name")
        .notEmpty()
        .withMessage("Travel name cannot be empty!")
        .isString()
        .trim()
        .escape()
        .isLength({min: 3, max: 50})
        .withMessage("Travel name must be at least 3 charactes long and less than 50"),
        check('starting_date')
        .notEmpty()
        .withMessage("Travel starting date cannot be empty!")
        .custom((value, {req}) => {
            if(isNaN(Date.parse(value))) {
                throw new Error("Starting date field does not fit format");
            } else {
                return true;
            }
        }),
        check('ending_date')
        .notEmpty()
        .custom((value, {req}) => {
            if(isNaN(Date.parse(value))) {
                throw new Error("Starting date field does not fit format");
            } else {
                return true;
            }
        }),
        check('descritpion')
        .optional({checkFalsy:true})
        .isString()
        .isLength({max: 2200}),
    ],
};

module.exports = ContentValidators;
