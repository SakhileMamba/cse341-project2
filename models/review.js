const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: ObjectId,
    required: true
  },
  reviewer: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Review', reviewSchema);
