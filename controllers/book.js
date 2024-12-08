const db = require('../models');
const Book = db.book;

module.exports.createBook = (req, res) => {
  try {
    const book = new Book(req.body);
    book
      .save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the book.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    await Book.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving books.'
        });
      });
  } catch (err) {
    res.status(500).send(err || 'Shit');
  }
};

module.exports.getOne = (req, res) => {
  try {
    const id = req.params.id;
    Book.findOne({ _id: id })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving book.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;

    Book.findOneAndUpdate({ _id: id }, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating book.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    Book.deleteOne({ _id: id })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting book.'
        });
      });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the book.');
  }
};
