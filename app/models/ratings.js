var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoffeeRatingSchema = new Schema({
     user:String,
     coffeeName:String,
     coffeeTaste:String,
     coffeeShop:String,
     ambience:String,
     recommended:String,
     comments:String
});

module.exports = mongoose.model('CoffeeRating',CoffeeRatingSchema);

