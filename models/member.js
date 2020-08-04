const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarURL: String,
  googleId: String,
  role: {type: Schema.Types.ObjectId, ref: 'Roles'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);