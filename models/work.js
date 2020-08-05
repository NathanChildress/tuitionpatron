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

const commissionSchema = new Schema({
    message: String,
    mediums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Medium'}],


})


const workSchema = new mongoose.Schema({
    artistAddress: String,
    workDesc: String,
    workMediums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Medium'}],
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true},
    commissions: [commissionSchema],
    workReviews: [reviewSchema]
  }, {
    timestamps: true
  });


module.exports= mongoose.model('Work', workSchema )