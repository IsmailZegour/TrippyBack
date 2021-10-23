const express = require("express");
const travelRouter = express.Router();
const TravelController = require("../controllers/travel.controller");
const UserController = require("../controllers/user.controller");
const ContentValidator = require("../validators/content.validators");
const Validator = require('../validators/index.validators');


// Begin Router
travelRouter
    .route('/')
    .post(UserController.isAuthRestrict,ContentValidator.validateTravel, Validator.checkValidationResult,TravelController.create);

travelRouter
    .route('/:id')
    .get(TravelController.getTravelById)
module.exports = travelRouter;
