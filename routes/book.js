const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const validation = require('../middleware/validation');
const auth = require('../middleware/authentication');
const { validate } = require('../models/book');

router.get('/', auth.isAuthenticated, bookController.getAll);

router.get(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateObjectId,
  bookController.getOne
);
router.post(
  '/',
  auth.isAuthenticated,
  validation.validateBookRules,
  validation.validateBook,
  bookController.createBook
);
router.put(
  '/:id',
  auth.isAuthenticated,

  validation.validateObjectIdRule,
  validation.validateBookRules,
  validation.validateBook,
  bookController.updateBook
);
router.delete(
  '/:id',
  auth.isAuthenticated,

  validation.validateObjectIdRule,
  validation.validateObjectId,
  bookController.deleteBook
);

module.exports = router;
