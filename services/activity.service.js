const ActivityRepository = require('../repositories/activity.repository');

const ActivityService = {
    create: async (activity) => {
        const newActivity = await ActivityRepository.create(activity);
        return newActivity;
    },
    getTravelActivitiesCount: async (travel_id) => {
        const count = await ActivityRepository.getTravelActivitiesCount(travel_id);
        return count;
    }
}

module.exports = ActivityService;