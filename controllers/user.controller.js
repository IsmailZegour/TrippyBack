const { response } = require("express");
const UserService = require("../services/user.service");
const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const Storage = require('../config/storage');

const UserController = {
    register: async (req, resp, next) => {
        const userInfos = (({first_name, last_name, gender, birth_date, username})=>({first_name, last_name, gender, birth_date, username}))(req.body);
        const secretInfos = (({password, mail})=>({password, mail}))(req.body);
        bcrypt.hash(secretInfos.password, 10, async function (err, hash) {
            if (err) {
                resp.send(err);
            }
            secretInfos.password = hash;
            const user = await UserService.register(userInfos, secretInfos);
            resp.status(200).send(user);
        })
    },
    isAuthRestrict: async (req,resp,next) => {
        if(await req.isAuthenticated()) {
            next();
        } else {
            return resp.status(401).send({message: 'User not Auth.'});
        }
    },
    isAuth: async (req,resp,next) => {
        if(await req.isAuthenticated()) {
            next();
        } else {
            next();
        }
    },
    logIn: async (req,resp, next) => {
        passport.authenticate('local-access', function (err, user, info) {
            if (err) {return next(err);}
            if (!user) {return resp.status(401).send({message: info})};
            req.logIn(user, function(err) {
                if (err) {return next(err)};
                return resp.status(200).send(user);
            })
        })(req, resp, next);
    },
    getInfos: async (req,resp,next) => {
        let id = req.params.id;
        let user = await UserService.getUser(id);
        let followers = await UserService.getFollowersCount(id);
        let following = await UserService.getFollowingCount(id);
        let travels = await UserService.getTravelsCount(id);
        let destinations = await UserService.getDestinationsCount(id);
        let activities = await UserService.getActivitiesCount(id);
        let userInfos = {user: user, followers: followers, following: following, travels: travels, destinations: destinations, activities: activities};
        return resp.status(200).send(userInfos);
    },
    getProfileDefault: async (req,resp,next) => {
        let id = req.params.id;
        let user = await UserService.getUserTravels(id);
        let followers = await UserService.getFollowersCount(id);
        let following = await UserService.getFollowingCount(id);
        let travels = await UserService.getTravelsCount(id);
        let destinations = await UserService.getDestinationsCount(id);
        let activities = await UserService.getActivitiesCount(id);
        let profile = {user: user, followers: followers, following: following, travels: travels, destinations: destinations, activities: activities};
        return resp.status(200).send(profile);
    },
    getUserPosts: async (req,resp, next) => {
        try {
            let id = req.params.id;
            let user = await UserService.getUserPosts(id);
            resp.status(200).send({user: user});
        } catch (err) {
            console.log(err);
            resp.send(err);
        }
    },
    getUserTravels: async (req,resp,next) => {
        let id = req.params.id;
        let user = await UserService.getUserTravels(id);
        resp.status(200).send({user: user});
    },
    getUserDestinations: async (req,resp,next) => {
        try {
            let id = req.params.id;
            let user = await UserService.getUserDestinations(id);
            resp.status(200).send({user: user});
        } catch (err) {
            console.log(err);
            resp.send(err);
        }
    },
    getUserActivities: async (req,resp,next) => {
        try {
            let id = req.params.id;
            let user = await UserService.getUserActivities(id);
            resp.status(200).send({user: user});
        } catch (err) {
            console.log(err);
            resp.send(err);
        }
    },
    getUser: async (req,resp,next) => {
        try {
            let id = req.params.id;
            let user = await UserService.getUser(id);
            resp.status(200).send({user: user});
        } catch (err) {
            console.log(err);
            resp.send(err);
        }
    },
    getRelation: async (req,resp,next) => {
        if( await req.isAuthenticated() ) {
            let visitor_id = req.user.id;
            let visited_id = req.params.id;
            if(visited_id == visitor_id) {
                let relation = {};
                relation.status_code = 'self';
                resp.send(relation);
            } else {
                let relation = await UserService.getRelation(visitor_id, visited_id);
                resp.send(relation);
            }
        } else {
            resp.send();
        }
    },
    follow: async (req, resp, next) => {
        const target_id = req.params.id;
        const id = req.user.id;
        let relation = await UserService.follow(target_id,id);
        resp.send(relation);
    },
    unfollow: async (req, resp, next) => {
        const target_id = req.params.id;
        const id = req.user.id;
        let relation = await UserService.unfollow(target_id,id);
        resp.send(relation);
    },
    addProfilePicture: async (req,resp,next) => {
        let id = req.user.id;
        const store = await Storage.createProfilePictureStore(id);
        let profile_picture = uuidv4()+'.'+req.body.profile_picture.originalname.split('.').pop();
        const directory = __root+'/assets/pictures/profile/'+id+'/pp';
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(directory+'/'+file), err => {
                    if (err) throw err;
                }
            }
        })
        fs.writeFile(__root+'/assets/pictures/profile/'+id+'/pp/'+profile_picture, Buffer.from(req.body.profile_picture.buffer), (err)=>{
            if(err) {
                console.log(err);
                return resp.send(err);
            }
        });
        const user = await UserService.addProfilePicture(id,profile_picture);
        return user;
    },
    addProfileBanner: async (req,resp,next) => {
        let id = req.user.id;
        const store = await Storage.cerateProfileBannerStore(id);
        let banner_picture = uuidv4()+'.'+req.body.profile_picture.originalname.split('.').pop();
        const directory = __root+'/assets/pictures/profile/'+id+'/banner';
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(directory+'/'+file), err => {
                    if (err) throw err;
                }
            }
        })
        fs.writeFile(__root+'/assets/pictures/profile/'+id+'/banner/'+banner_picture, Buffer.from(req.body.banner_picture.buffer), (err)=>{
            if(err) {
                console.log(err);
                return resp.send(err);
            }
        });
        const user = await UserService.addProfileBanner(id,banner_picture);
        return user;
    },
    getConversations: async (req,resp,next) => {
        const id = req.user.id;
        const conversations = await UserService.getConversations(id);
        resp.send(conversations);
    }
}

module.exports = UserController;