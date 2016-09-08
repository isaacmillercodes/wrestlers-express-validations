const express = require('express');
const router = express.Router();
const title = 'Wrestler_DB';

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Wrestler_DB';
  res.redirect('/wrestlers', renderObject);
});

module.exports = router;
