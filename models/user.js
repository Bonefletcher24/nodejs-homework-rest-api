const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatarURL: {
    type: String,
    default: function() {
      return gravatar.url(this.email, { s: '250', d: 'retro' }, true);
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
