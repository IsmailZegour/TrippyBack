const express = require("express");
const router = express.Router();
const UserRouter = require('./user.router');
const TravelRouter = require('./travel.router');
const DestinationRouter = require('./destination.router');
const ActivityRouter = require('./activity.router');
const PostRouter = require('./post.router');
const ChatRouter = require('./chat.router');

//router.use(MusicRouter);
router.use('/user',UserRouter);
router.use('/travel',TravelRouter);
router.use('/destination',DestinationRouter);
router.use('/activity',ActivityRouter);
router.use('/post',PostRouter);
router.use('/chat',ChatRouter);

module.exports = router;
