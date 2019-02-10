var mongojs = require('mongojs');

var db = mongojs ('localhost:27017/movies', ['movies','categories']);

function movies (id,name, year, category_id, amount_earned) {
  this.id = id;
  this.name = name;
  this.year = year;
  this.category_id = category_id;
  this.amount_earned = amount_earned;
};

function categories (id, name) {
  this.id = id;
  this.name= name;
};

module.exports = {db, movies, categories};