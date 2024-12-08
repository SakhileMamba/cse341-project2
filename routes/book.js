const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const validation = require('../middleware/validation');
const { validate } = require('../models/book');

router.get('/', bookController.getAll);
router.get(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateObjectId,
  bookController.getOne
);
router.post('/', validation.validateBookRules, validation.validateBook, bookController.createBook);
router.put(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateBookRules,
  validation.validateBook,
  bookController.updateBook
);
router.delete(
  '/:id',
  validation.validateObjectIdRule,
  validation.validateObjectId,
  bookController.deleteBook
);

module.exports = router;
