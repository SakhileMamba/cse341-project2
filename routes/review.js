const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const validation = require('../middleware/validation');
const { validate } = require('../models/book');

router.get('/', reviewController.getAll);
router.get(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateObjectId,
  reviewController.getOne
);
router.post(
  '/',
  validation.validateReviewRules,
  validation.validateReview,
  reviewController.createReview
);
router.put(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateReviewRules,
  validation.validateReview,
  reviewController.updateReview
);
router.delete(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateObjectId,
  reviewController.deleteReview
);

module.exports = router;
