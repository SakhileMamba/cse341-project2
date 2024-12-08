const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //#swagger.tags=['CSE341 Project 2']
  res.send('CSE341 Project 2');
});

router.use('/', require('./swagger'));
router.use('/book', require('./book'));
router.use('/review', require('./review'));

module.exports = router;
