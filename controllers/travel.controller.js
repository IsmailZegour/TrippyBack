const TravelService = require('../services/travel.service');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const DestinationService = require('../services/destination.service');
const ActivityService = require('../services/activity.service');
const PostService = require('../services/post.service');


const TravelController = {
    create: async (req,resp, next) => {
        let filename = uuidv4()+'.'+req.body.picture.originalname.split('.').pop();
        fs.writeFile(__root+process.env.TRAVELS_PIC_STORE+'/'+filename, Buffer.from(req.body.picture.buffer), (err)=>{
            if(err) {
                console.log(err);
                return resp.send(err);
            }
        });
        const travel_datas = req.body;
        travel_datas.picture = filename;
        travel_datas.user_id = req.user.id;
        let travel = await TravelService.create(travel_datas);
        resp.send(travel);
    },
    getTravelById: async(req,resp,next) => {
        let travel_id = req.params.id;
        let travel = await TravelService.getTravelById(travel_id);
        return resp.status(200).send(travel);    
    }
    
}

module.exports = TravelController;