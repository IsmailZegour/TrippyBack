const {validationResult} = require('express-validator');

const validator = {
    checkValidationResult: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          {console.log(errors);return res.status(422).send(errors.array());}
        next();
    }
}

module.exports = validator;