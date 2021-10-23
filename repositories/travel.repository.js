const db = require("../models");
const destination = require("../models/destination");
const Travel = db.travel;

const TravelRepository = {
    create: async (travel_datas) => {
        const travel = await Travel.create(travel_datas);
        return travel;
    },
    getTravelInfosByPk: async (travel_id) => {
        const travel = Travel.findAll({where: {id: travel_id}, attributes: {
            include: [
              [Sequelize.fn('COUNT', Sequelize.col('activities.travel_id')), 'activitiesCount'],
              [Sequelize.fn('COUNT', Sequelize.col('destinations.travel_id')), 'destinationsCount'],
              [Sequelize.fn('COUNT', Sequelize.col('posts.Travel_id')), 'postsCount'],
            ]},
          include: [
            {model: Activity, attributes: []}, 
            {model: Destination, attributes: []},
            {model: Post, attributes: []},
        ],
        group: ['travels.id']});
        return travel;
    }
}

module.exports = TravelRepository;