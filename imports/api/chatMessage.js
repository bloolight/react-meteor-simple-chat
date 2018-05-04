import { Mongo } from 'meteor/mongo';

// Create Collection
let ChatMessages = new Mongo.Collection('chat_messages');

export const addMessage = (chatId, userId, message, callback) => {

  const createdAt = new Date();
  const updatedAt = new Date();

  ChatMessages.insert(
    {
      chatId,
      userId,
      message,
      createdAt,
      updatedAt
    },
    callback
  )
}

export const getMessages = (chatId) => {
  return ChatMessages.find({ chatId: chatId }, { sort: { createdAt: 1 } }).fetch();
}

export default ChatMessages;
