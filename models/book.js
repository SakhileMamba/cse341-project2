const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  publishYear: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
