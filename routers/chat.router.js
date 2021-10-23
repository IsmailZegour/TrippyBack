const express = require('express');
const UserController = require('../controllers/user.controller');
const ChatController = require('../controllers/chat.controller');
const chatRouter = express.Router();

chatRouter
    .route("/message")
    .post(UserController.isAuthRestrict, ChatController.newMessage);
chatRouter
    .route("/conversation/:id")
    .get(UserController.isAuthRestrict, ChatController.getConversation);
chatRouter
    .route("/messages/:id")
    .get(UserController.isAuthRestrict, ChatController.loadMessages);





module.exports= chatRouter;