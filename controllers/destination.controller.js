const DestinationService = require('../services/destination.service');

const DestinationController = {
    create: async (req,resp,next) => {
        if(req.travel) {
            req.body.destinaions.forEach(async(destination) => {
                if(req.travel) {
                    destination.traveil_id = req.travel.id;
                }
                destination.user_id = req.user.id
                await DestinationService.create(destination);
            });
        }
    },
    getTravelDestinationsCount: async (req,resp,next) => {
        let travel_id = req.params.id;
        let count = await DestinationService.getTravelDestinationsCount(travel_id);
        resp.status(200).send(count);
    },
}

module.exports = DestinationController;