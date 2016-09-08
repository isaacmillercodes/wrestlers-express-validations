const knex = require('../db/knex');

function verify(req, res, next) {
  // container for all errors
  const errors = [];
  // grab values from req.body
  const name = req.body.name;
  const finishing_move = req.body.finisher;
  // is username blank?
  if (name === '') {
    errors.push('Name cannot be blank');
  }
  // is hobby blank?
  if (finishing_move === '') {
    errors.push('Finishing move cannot be blank');
  }
  // is name unique?
  isUnique('name', name, (err, response) => {
    if (err) {
      return next(err);
    }
    if (response) {
      errors.push('Sorry that name is taken!');
    }
    // send back errors, if applicable
    if (errors.length) {
      // re-render page if there are errors
      const renderObject = {};
      renderObject.errors = errors;
      return res.render('new', renderObject);
    } else {
      // send to next middle if there are no errors
      return next();
    }
  });
}

// helper function

function isUnique(column, value, callback) {
  knex('wrestlers')
  .select()
  .where(column, value)
  .then((results) => {
    if (results.length) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  })
  .catch((err) => {
    callback(err);
  });
}

module.exports = {
  verify
};
