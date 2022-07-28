const { Schema, model} = require ('mongoose');
const dateFormat = require('../utils/dateFormat');

const memorySchema = new Schema({
    memoryText: {
      type: String,
      required: 'What memory do you want to share',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    memoryHaver: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    
  });
  
  const Memory = model('Memory', memorySchema);
  
  module.exports = Memory;