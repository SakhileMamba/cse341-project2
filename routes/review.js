const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const validation = require('../middleware/validation');
const { validate } = require('../models/book');
const { isAuthenticated } = require('../middleware/authentication');

router.get('/', reviewController.getAll);
router.get(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateObjectId,
  reviewController.getOne
);
router.post(
  '/',
  isAuthenticated,
  validation.validateReviewRules,
  validation.validateReview,
  reviewController.createReview
);
router.put(
  '/:id',
  isAuthenticated,
  validation.validateObjectIdRule,
  validation.validateReviewRules,
  validation.validateReview,
  reviewController.updateReview
);
router.delete(
  '/:id',
  isAuthenticated,
  validation.validateObjectIdRule,
  validation.validateObjectId,
  reviewController.deleteReview
);

module.exports = router;
