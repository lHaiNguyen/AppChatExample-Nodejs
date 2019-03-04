const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
   user_name: String,
   messages: String,
   room: {
     type: String   }
  });

const chatsModel = mongoose.model('chats', chatSchema);
module.exports = chatsModel;