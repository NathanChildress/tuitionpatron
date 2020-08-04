const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  photoURL: String,
  hidden: Boolean,
  bio: String,
  member: {type: Schema.Types.ObjectId, ref: 'Member'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);