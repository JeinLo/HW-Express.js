// src/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', default: [] }],
});

module.exports = mongoose.model('User', userSchema);