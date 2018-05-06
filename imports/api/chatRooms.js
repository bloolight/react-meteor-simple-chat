/**
 * API methods for the chat-rooms collection
 */

import { Mongo } from 'meteor/mongo';

// Create Collection
let ChatRooms = new Mongo.Collection('chat_rooms');

export const createChatRoom = (title, desc, members, owner, callback) => {
  const createdAt = new Date();

  ChatRooms.insert(
    {
      title,
      desc,
      members,
      owner,
      createdAt
    },
    callback
  )
}

export const getAllChatRooms = () => {
  return ChatRooms.find({}, { sort: { createdAt: -1 } }).fetch();
}

export const getUserChatRooms = (userId) => {
  return ChatRooms.find(
    { members: userId },
    { sort: { createdAt: -1 } }
  ).fetch();
}

export const getChatRoom = (chatId) => {
  return ChatRooms.findOne({ _id: chatId });
}

export const addChatMember = (chatId, userId) => {
  ChatRooms.update(
    { _id: chatId },
    { $push: { members: userId }}
  );
}

export const deleteChat = (chatId, callback) => {
  ChatRooms.remove(
    chatId,
    callback
  )
}

export default ChatRooms;
