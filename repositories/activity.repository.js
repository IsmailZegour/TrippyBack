const db = require('../models');
const Activity = db.activity;

const ActivityRepository = {
    create: (activity) => {
        let newActivity = Activity.create(activity).then(res => {
            return res;
        }).catch(err => {
            return err;
        })
        return newActivity;
    },
    getTravelActivitiesCount: (travel_id) => {
        let activitiesCount = Activity.count({where: {travel_id: travel_id}}).then(count => {
            return count;
        }).catch(err => {
            return err;
        })
        return activitiesCount;
    }
}

module.exports = ActivityRepository;