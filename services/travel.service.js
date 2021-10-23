const TravelRepository = require('../repositories/travel.repository');

const TravelService = {
    create: async (travel_datas) => {
        const travel = await TravelRepository.create(travel_datas);
        return travel;
    },
    getTravelById: async (travel_id) => {
        const travel = await TravelRepository.getTravelById(travel_id);
        return travel;
    }
}

module.exports = TravelService;