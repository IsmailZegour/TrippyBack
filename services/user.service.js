const user = require("../models/user");
const UserRepository = require("../repositories/user.repository");

/**
 * User service
 */

const UserService = {
  register: async (userInfos, secretInfos) => {
    const user = await UserRepository.register(userInfos, secretInfos);
    return user;
  },
  isMailUnique: async (mail) => {
    const isUnique = await UserRepository.isMailUnique(mail);
    return isUnique;
  },
  isUsernameUnique: async (username) => {
    const isUnique = await UserRepository.isUsernameUnique(username);
    return isUnique;
  },
  getTravelsCount: async (id) => {
    const travels = await UserRepository.getTravelsCount(id);
    return travels;
  },
  getDestinationsCount: async (id) => {
    const destinations = await UserRepository.getDestinationsCount(id);
    return destinations;
  },
  getActivitiesCount: async (id) => {
    const activities = await UserRepository.getActivitiesCount(id);
    return activities;
  },
  getFollowers: async (id) => {
    const followers = await UserRepository.getFollowers(id);
    return followers;
  },
  getFollowersCount: async (id) => {
    const followers = await UserRepository.getFollowersCount(id);
    return followers;
  },
  getFollowing: async (id) => {
    const following = await UserRepository.getFollowing(id);
    return following;
  },
  getFollowingCount: async (id) => {
    const following = await UserRepository.getFollowingCount(id);
    return following;
  },
  getUserPosts: async (id) => {
    const user = await UserRepository.getUserPosts(id);
    return user;
  },
  getUserTravels: async (id) => {
    const user = await UserRepository.getUserTravels(id);
    return user;
  },
  getUserDestinations: async (id) => {
    const user = await UserRepository.getUserDestinations(id);
    return user;
  },
  getUserActivities: async (id) => {
    const user = await UserRepository.getUserActivities(id);
    return user;
  },
  getUser: async (id) => {
    const user = await UserRepository.getUser(id);
    return user;
  },
  getRelation: async (visitor_id, visited_id) => {
    const relation = await UserRepository.getRelation(visitor_id, visited_id);
    return relation;
  },
  follow: async (target_id, id) => {
    const relation = await UserRepository.follow(target_id, id);
    return relation;
  },
  unfollow: async (target_id, id) => {
    const relation = await UserRepository.unfollow(target_id, id);
    return relation;
  },
  addProfilePicture: async (id,profile_picture) => {
    const user = await UserRepository.addProfilePicture(id,profile_picture);
    return user;
  },
  addProfileBanner: async (id,banner_picture) => {
    const user = await UserRepository.addProfileBanner(id,banner_picture);
    return user;
  },
  getConversations: async (id) => {
    const conversations = await UserRepository.getConversations(id);
    return conversations;
  }
};

module.exports = UserService;
