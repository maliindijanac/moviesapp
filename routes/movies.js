var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mymongo = require ('./mymongo.js');

/* GET movies listing. */
router.get('/', function(req, res, next) {
  mymongo.db.movies.find({}, function (err, movies) {
    res.send(movies);
  });
});

router.get('/:id', function(req, res, next) {
  mymongo.db.movies.findOne ({id:req.params.id}, function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
        console.log(result);
        res.send(result);
    }       

 } ) ;
});

router.post('/', function(req, res, next) {
  var movie = new mymongo.movies (req.body.id, req.body.name,req.body.year, req.body.category_id,  req.body.amount_earned);

  mymongo.db.movies.save (movie, function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
      
        res.send(result);
    }       

 } ) ;
});

router.put('/:id', function(req, res, next) {
  var movies = new mymongo.movies (req.body.id, req.body.name, req.body.year,req.body.category_id,  req.body.amount_earned);

  mymongo.db.movies.findAndModify({

	  query: {id:req.params.id},
      update: {$set: movies}
 },
  function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
      
        res.send(result);
    }       

 } ) ;
});

router.delete('/:id', function(req, res, next) {
  mymongo.db.movies.remove({id:req.params.id}, function (err, result) {
    if (err) {
        res.send (error);
    }
    else {
        console.log(result);
        res.send(result);
    }       

 } ) ;
});



module.exports = router;
