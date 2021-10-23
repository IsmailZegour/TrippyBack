const express = require("express");
const postRouter = express.Router();
const PostController = require('../controllers/post.controller');
const ContentValidator = require("../validators/content.validators");


// Begin Router
postRouter
    .route('/travel/post/:id')
    .get(PostController.getTravelPostsCount);

module.exports = postRouter;
