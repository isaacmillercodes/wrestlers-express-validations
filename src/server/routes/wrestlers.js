const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
const validations = require('./validations');

router.get('/', (req, res, next) => {
  // grab all the wrestlers from the database
  knex('wrestlers').select()
  .then((results) => {
    const renderObject = {};
    renderObject.wrestlers = results;
    renderObject.title = 'Wrestler_DB';
    // send the wrestlers with the res.render
    res.render('wrestlers', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/new', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Add a Wrestler';
  res.render('new', renderObject);
});
//
router.post('/new', validations.verify, (req, res, next) => {
  // grab the values to add to the db via req.body
  const name = req.body.name;
  const finishing_move = req.body.finisher;
  const catch_phrase = req.body.catchPhrase;
  // add values to database
  knex('wrestlers').insert({
    name: name,
    finishing_move: finishing_move,
    catch_phrase: catch_phrase
  })
  .then((results) => {
    // redirect user
    res.redirect('/wrestlers');
  })
  .catch((err) => {
    return next(err);
  });
});
//
router.delete('/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  knex('wrestlers')
  .del()
  .where('id', id)
  .returning('*')
  .then((results) => {
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].name} is gone!`
      });
    } else {
      res.status(404).json({
        status: 'errror',
        message: 'That id does not exist'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'errror',
      message: 'Something bad happened!'
    });
  });
});

router.put('/update/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const updatedName = req.body.name;
  const updatedFinishing_Move = req.body.finisher;
  const updatedCatch_Phrase = req.body.catchPhrase;
  knex('wrestlers')
  .update({
    name: updatedName,
    finishing_move: updatedFinishing_Move,
    catch_phrase: updatedCatch_Phrase
  })
  .where('id', id)
  .returning('*')
  .then((results) => {
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].name} has been updated!`
      });
    } else {
      res.status(404).json({
        status: 'errror',
        message: 'That id does not exist'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'errror',
      message: 'Something bad happened!'
    });
  });
});

module.exports = router;
