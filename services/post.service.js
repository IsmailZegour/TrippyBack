const PostRepository = require('../repositories/post.repository');

const PostService = {
    create: async (post) => {
        const newPost = await PostRepository.create(post);
        return newPost;
    },
    getTravelPostsCount: async (travel_id) => {
        const count = await PostRepository.getTravelPostsCount(travel_id);
        return count;
    }
}

module.exports = PostService;