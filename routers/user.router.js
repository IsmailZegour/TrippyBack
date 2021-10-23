const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/user.controller");
const UserValidator = require("../validators/user.validators");
const Validator = require('../validators/index.validators');

// Begin Router
userRouter
    .route('/travels/:id')
    .get(UserController.getUserTravels) //retrieve User travels
userRouter
    .route('/posts/:id')
    .get(UserController.getUserPosts) // retrieve User posts
userRouter
    .route('/destinations/:id')
    .get(UserController.getUserDestinations) //retrieve User destinations
userRouter
    .route('/activities/:id')
    .get(UserController.getUserActivities) //retrieve User activities
userRouter
    .route('/profile/:id') // Retrieve all the User Informations 
    .get(UserController.getUser);
userRouter
    .route('/relation/:id')
    .get(UserController.getRelation); //Retrieve relation between 2 users;
userRouter
    .route('/register')
    .post(UserValidator.validateRegister, Validator.checkValidationResult, UserController.register) // Register user to site
userRouter
    .route('/unfollow/:id')
    .get(UserController.isAuthRestrict, UserController.unfollow);
userRouter
    .route('/follow/:id')
    .get(UserController.isAuthRestrict,UserController.follow);
userRouter
    .route('/login')
    .post(UserValidator.validateLogin, Validator.checkValidationResult,UserController.logIn);
userRouter
    .route('/restrict')
    .get(UserController.isAuthRestrict, function(req,resp,next) {
        resp.send(req.user);
    });
userRouter
    .route('/auth')
    .get(UserController.isAuth)
userRouter
    .route('/messages')
    .get(UserController.isAuthRestrict, UserController.getConversations)

module.exports = userRouter;
