const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediumSchema = new mongoose.Schema({
  mediumName: {
    type: String,
    required: true
  },
  mediumMaterials: {
    type: String,
    required: true
  },
  mediumDesc: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Medium', mediumSchema);