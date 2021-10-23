const PostService = require('../services/post.service');

const PostController = {
    create: async (req,resp,next) => {
    },
    getTravelPostsCount: async (req,resp,next) => {
        let travel_id = req.params.id;
        let count = await PostService.getTravelPostsCount(travel_id);
        resp.status(200).send(count);
    },
}

module.exports = PostController;