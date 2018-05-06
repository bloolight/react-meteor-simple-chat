/**
 * API methods for the users collection
 */

import { Mongo } from 'meteor/mongo';

// Create Collection
let Users = new Mongo.Collection('users');

export const createUser = (username, callback) => {

  const createdAt = new Date();

  Users.insert(
    {
      username,
      createdAt
    },
    callback
  )
}

export const getUsers = () => {
  return Users.find({}).fetch();
}

export const findUser = (userId) => {
  return Users.findOne({ _id: userId });
}

export const findUserByUsername = (username) => {
  username = username.toLowerCase();
  return Users.findOne({ username });
}

export const getUsersByIds = (userIds = []) => {
  return Users.find({ _id: {
    '$in': userIds
  }}).fetch();
}

export const editDetails = (userId, username, name, email, callback) => {
  const updatedAt = new Date();
  username = username.toLowerCase();

  Users.update(
    {
      _id: userId
    },
    { $set: {
        username,
        name,
        email,
        updatedAt
      }
    },
    callback
  )
}

export default Users;
