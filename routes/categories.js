var express = require('express');
var router = express.Router();
var mymongo = require ("./mymongo")

/* GET users listing. */
router.get('/', function(req, res, next) {
  mymongo.db.categories.find ({}, function (err, result) {
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