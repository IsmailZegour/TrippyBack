const db = require('../models');
const Post = db.post;

const PostRepository = {
    create: (post) => {
        const newPost = Post.create(post).then(res => {
            return res;
        }).catch(err => {
            return err;
        })
        return newPost;
    },
    getTravelPostsCount: (travel_id) => {
        const postsCount = Post.count({where: {travel_id: travel_id}}).then(count => {
            return count;
        }).catch(err => {
            return err;
        })
        return postsCount;
    }
}

module.exports = PostRepository;