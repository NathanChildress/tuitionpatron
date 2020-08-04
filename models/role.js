const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  roleRank:{
    type: Number,
    min: 1,
    max: 100,
    default: 10,
    required: true
  },
  roleDesc: {
    type: String,
  },
});

module.exports = mongoose.model('Role', roleSchema);