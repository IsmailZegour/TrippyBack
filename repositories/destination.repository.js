const db = require('../models');
const Destination = db.destination;

const DestinationRepository = {
    create: (destination) => {
        const newDestination = Destination.create(destination).then(res => {
            return res;
        }).catch(err => {
            return err;
        })
        return newDestination;
    },
    getTravelDestinationsCount: (travel_id) => {
        const destinationCount = Destination.count({where: {travel_id: travel_id}}).then(count => {
            return count;
        }).catch(err => {
            return err;
        })
        return destinationCount;
    }
}

module.exports = DestinationRepository;