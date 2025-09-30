// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
      name: {
    type: String,
    required: true,  // if you want it mandatory
  },
  email: {
    type: String,
    required: true,  // typically required to send mail
  },
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Task', taskSchema);
