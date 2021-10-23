const express = require("express");
const destinationRouter = express.Router();
const DestinationController = require('../controllers/destination.controller');
const ContentValidator = require("../validators/content.validators");


// Begin Router
destinationRouter
    .route('/travel/destination/:id')
    .get(DestinationController.getTravelDestinationsCount);

module.exports = destinationRouter;
