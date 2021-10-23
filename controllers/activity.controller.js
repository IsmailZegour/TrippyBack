const ActivityService = require('../services/activity.service');

const ActivityController = {
    create: async (req,resp,next) => {
    },
    getTravelActivitiesCount: async (req,resp,next) => {
        let travel_id = req.params.id;
        let count = await ActivityService.getTravelActivitiesCount(travel_id);
        resp.status(200).send(count);
    },
}

module.exports = ActivityController;