const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomSchema = new Schema({
   room_name: {
       type: String,
       unique: true
   }
  });

const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel;