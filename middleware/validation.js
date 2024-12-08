const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

// Book validation
const validateBookRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Valid title is required')
    .isString()
    .withMessage('Valid title is required'),

  body('author')
    .trim()
    .notEmpty()
    .withMessage('Valid author is required')
    .isString()
    .withMessage('Valid author is required'),

  body('isbn')
    .trim()
    .notEmpty()
    .withMessage('Valid ISBN is required (10-13 digits with optional hyphens)')
    .matches(/^[\d-]{10,17}$/)
    .withMessage('Valid ISBN is required (10-13 digits with optional hyphens)'),

  body('publishYear')
    .notEmpty()
    .withMessage('Valid publish year is required')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Valid publish year is required'),

  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Valid genre is required')
    .isString()
    .withMessage('Valid genre is required'),

  body('publisher')
    .trim()
    .notEmpty()
    .withMessage('Valid publisher is required')
    .isString()
    .withMessage('Valid publisher is required'),

  body('language')
    .trim()
    .notEmpty()
    .withMessage('Valid language is required')
    .isString()
    .withMessage('Valid language is required'),

  body('pageCount')
    .notEmpty()
    .withMessage('Valid page count is required (positive integer)')
    .isInt({ min: 1 })
    .withMessage('Valid page count is required (positive integer)')
];

const validateBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Sanitize data
  req.body.title = req.body.title.trim();
  req.body.author = req.body.author.trim();
  req.body.isbn = req.body.isbn.replace(/-/g, ''); // Remove hyphens from ISBN
  req.body.genre = req.body.genre.trim();
  req.body.publisher = req.body.publisher.trim();
  req.body.language = req.body.language.trim();

  next();
};

// Review validation
const validateReviewRules = [
  body('bookId').custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new Error('Valid book ID is required');
    }
    return true;
  }),

  body('review')
    .trim()
    .notEmpty()
    .withMessage('Review must be between 10 and 1000 characters')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review must be between 10 and 1000 characters'),

  body('reviewer')
    .trim()
    .notEmpty()
    .withMessage('Reviewer must be between 2 and 50 characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('Reviewer must be between 2 and 50 characters')
];

const validateReview = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Sanitize data
  req.body.review = req.body.review.trim();
  req.body.reviewer = req.body.reviewer.trim();

  next();
};

// Helper function to validate MongoDB ObjectId
const validateObjectIdRule = [
  param('id').custom((value) => {
    if (!ObjectId.isValid(value)) {
      throw new Error('Invalid ObjectId');
    }
    return true;
  })
];

const validateObjectId = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validateBook,
  validateBookRules,
  validateReview,
  validateReviewRules,
  validateObjectIdRule,
  validateObjectId
};
