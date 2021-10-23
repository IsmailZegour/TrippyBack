const DestinationRepository = require('../repositories/destination.repository');

const DestinationService = {
    create: async (destination) => {
        const newDestination = await DestinationRepository.create(destination);
        return newDestination;
    },
    getTravelDestinationsCount: async (travel_id) => {
        const count = await DestinationRepository.getTravelDestinationsCount(travel_id);
        return count;
    }
}

module.exports = DestinationService;