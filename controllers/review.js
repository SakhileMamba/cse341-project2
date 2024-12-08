const db = require('../models');
const Review = db.review;

module.exports.createReview = (req, res) => {
  try {
    const bookId = req.body.bookId;
    Review.find({ _id: bookId })
      .then((data) => {
        if (data) {
          const review = new Review(req.body);
          review
            .save()
            .then((data) => {
              console.log(data);
              res.status(201).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || 'Some error occurred while creating the book.'
              });
            });
        } else {
          res.status(404).send({
            message: err.message || 'Book does not exist, Review cannot be created'
          });
        }
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

module.exports.getAll = (req, res) => {
  try {
    Review.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving reviews.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getOne = (req, res) => {
  try {
    const id = req.params.id;
    Review.findOne({ _id: id })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving review.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id;

    Review.findOneAndUpdate({ _id: id }, req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating review.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    Review.deleteOne({ _id: id })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting review.'
        });
      });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the review.');
  }
};
