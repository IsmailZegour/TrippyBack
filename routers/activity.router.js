const express = require("express");
const activityRouter = express.Router();
const ActivityController = require('../controllers/activity.controller');
const ContentValidator = require("../validators/content.validators");


// Begin Router
activityRouter
    .route('/travel/activity/:id')
    .get(ActivityController.getTravelActivitiesCount);

module.exports = activityRouter;
