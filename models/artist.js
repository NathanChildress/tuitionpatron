const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema =  new Schema({
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    revAuthor: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
    hidden: Boolean,
    imageURL: String,
  }, { timestamps: true });


const artistSchema = new mongoose.Schema({
    artistAddress: String,
    artistBio: String,
    artistMediums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Medium'}],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
  }, {
    timestamps: true
  });


module.exports= mongoose.model('Artist', artistSchema )