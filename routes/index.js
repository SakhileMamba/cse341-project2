const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  //#swagger.tags=['CSE341 Project 2']
  res.send('CSE341 Project 2');
});

router.use('/', require('./swagger'));
router.use('/book', require('./book'));
router.use('/review', require('./review'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
});
module.exports = router;
