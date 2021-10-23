const db = require("../models");
const { Sequelize } = require("../models");
const { Op } = require("sequelize");
const User = db.user;
const Secret = db.secret;
const Travel = db.travel;
const Destination = db.destination;
const Activity = db.activity;
const Relationship = db.relationship;
const Post = db.post;
const Conversation = db.Conversation;
const Message = db.Message;
/**
 * User repository
 */
const UserRepository = {
  register: async (userInfos, secretInfos) => {
    try {
      const user = await User.create(userInfos);
      await user.createSecret(secretInfos);
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  isMailUnique: (mail) => {
    return Secret.count({ where: {mail: mail}})
      .then(count => {
        return (count < 1) ? true : false
      }).catch(err => {return err});
  },
  isUsernameUnique: (username) => {
    return User.count({where: {username: username}}).then(count => {
      return (count < 1) ? true : false
    }).catch(err => {return err});
  },
  getTravelsCount: (id) => {
    return Travel.count({ where: { user_id: id } })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(err);
        return err;
      });
  },
  getDestinationsCount: (id) => {
    return Destination.count({ where: { user_id: id } })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(err);
        return err;
      });
  },
  getActivitiesCount: (id) => {
    return Activity.count({ where: { user_id: id } })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(err);
        return err;
      });
  },
  getFollowing: (id) => {
    let following = Relationship.findAndCountAll({ where: { requester_id: id, status_code: 'A' } })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(err);
        return err;
      });
    return following;
  },
  getFollowers: (id) => {
    let followers = Relationship.findAndCountAll({ where: { addressee_id: id, status_code: 'A' } })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(err);
        return err;
      });
    return followers;
  },
  getFollowingCount: (id) => {
    let followingCount = Relationship.count({ where: { requester_id: id, status_code: 'A' } })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(err);
        return err;
      });
    return followingCount;
  },
  getFollowersCount: (id) => {
    let followerCount = Relationship.count({ where: { addressee_id: id, status_code: 'A' } })
      .then(result => {
        return result;
      }).catch(err => {
        console.log(err);
        return err;
      });
    return followerCount;
  },
  getUser: async (id) => {
    try {
      let following = await Relationship.count({where: {requester_id:id,status_code:'A'}});
      let followers = await Relationship.count({where: {addressee_id: id, status_code: 'A'}});
      let user = await User.findAll(
        {where: {id:id},
        attributes: {
          include: [
            [Sequelize.fn('COUNT', Sequelize.col('travels.user_id')), 'travelsCount'],
            [Sequelize.fn('COUNT', Sequelize.col('destinations.user_id')), 'destinationsCount'],
            [Sequelize.fn('COUNT', Sequelize.col('posts.user_id')), 'postsCount'],
            [Sequelize.fn('COUNT', Sequelize.col('activities.user_id')), 'activitiesCount']
          ]
        },
        include: [
          {model: Travel, attributes: []}, 
          {model: Destination, attributes: []},
          {model: Post, attributes: []},
          {model: Activity, attributes: []}
          ],
        group: ['user.id']
      });
      user[0].setDataValue('followers', followers);
      user[0].setDataValue('following', following);
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getRelation: async (visitor_id, visited_id) => {
    let relation = await Relationship.findOne({where: {[Op.or]: [{requester_id: visited_id, addressee_id: visitor_id}, {requester_id:visitor_id, addressee_id:visited_id}]}});
    return relation;
  },
  getUserPosts: async (id) => {
    try {
      let user = await User.findAll({where: {id:id}, include: Post});
      return user;
    } catch (err) {
      return err;
    }
  },
  getUserTravels: async (id) => {
    try {
      let user = await User.findAll({where: {id:id},include: [
        {model: Travel, attributes: {
          include: [
            [Sequelize.fn('COUNT', Sequelize.col('activities.travel_id')), 'activitiesCount'],
            [Sequelize.fn('COUNT', Sequelize.col('destinations.travel_id')), 'destinationsCount'],
            [Sequelize.fn('COUNT', Sequelize.col('posts.Travel_id')), 'postsCount'],
          ]},
        },
        {model: Activity, attributes: []}, 
        {model: Destination, attributes: []},
        {model: Post, attributes: []},
      ],
      group: ['travels.id']});
      return user;
    } catch (err) {
      return err;
    }
  },
  getUserDestinations: async (id) => {
    try {
      let user = await User.findAll({where: {id:id}, include: Destination});
      return user;
    } catch (err) {
      return err;
    }
  },
  getUserActivities: async (id) => {
    let user = await User.findAll({where: {id:id}, include: Activity});
    return user;
  },
  follow: async (target_id, id) => {
    const relation = await Relationship.findOrCreate({
      where: {[Op.or]: [ {requester_id: target_id, addressee_id: id}, {requester_id:id, addressee_id: target_id}]},
      defaults: {
        requester_id: id,
        addressee_id: target_id,
      }
    });
    return relation;
  },
  unfollow: async (target_id, id) => {
    const relation = await Relationship.findOne({where: {[Op.or]: [ {requester_id: target_id, addressee_id: id}, {requester_id:id, addressee_id: target_id}]}});
    relation.status_code = 'C';
    relation.specified_id = id;
    relation.save();
    return relation;
  },
  addProfilePicture: async (id,profile_picture) => {
    let user = await User.findByPk(id);
    user.profile_picture = profile_picture;
    await user.save();
    return user;
  },
  addProfileBanner: async (id, banner_picture) => {
    let user = await User.findByPk(id);
    user.banner_picture = banner_picture;
    await user.save();
    return user();
  },
  getConversations: async (id) => {
    let conversations = await Conversation.find( { $or: [{user1:id},{user2:id}] } );
    return conversations;
  }
};

module.exports = UserRepository;
