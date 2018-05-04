import { Mongo } from 'meteor/mongo';

// Create Collection
let ChatRooms = new Mongo.Collection('chat_rooms');

export const createChatRoom = (title, desc, members, callback) => {

  const createdAt = new Date();

  ChatRooms.insert(
    {
      title,
      desc,
      members,
      createdAt
    },
    callback
  )
}

export const getAllChatRooms = () => {
  return ChatRooms.find({}, { sort: { createdAt: -1 } }).fetch();
}

export const getChatRoom = (chatId) => {
  const rr = ChatRooms.findOne({ _id: chatId });
  return rr;
}

export default ChatRooms;
