var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config.js');
var coffeeRating = require('./app/models/ratings.js');
var superSecret = "secretKey";

mongoose.connect(config.database,function(err){
    if(err) console.log(err);
    else console.log("connected to database");
});


//app.set('superSecret','secretKey');

app.use(express.static(__dirname+'/public')); 
app.use(morgan('dev')) ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 



var router = express.Router();
        //middleware
router.use(function(req,res,next){
    console.log('something is happening');
next();
});

       // route to add coffee rating to mongodb
        router.post('/registerCoffeeExperience',function(req,res,next){
               var rating = new coffeeRating();
                rating.user = req.body.user;
                rating.coffeeName = req.body.coffeeName;
                rating.coffeeTaste = req.body.coffeeTaste;
                rating.coffeeShop = req.body.coffeeShop;
                rating.ambience = req.body.ambience;
                rating.recommended = req.body.recommended;
                rating.comments = req.body.comments;
    
            rating.save(function(err){
                if(err) {
                    
                    //next(err);
                    res.send(err);
                    return
                }else{
                     res.json({ message: 'Your coffee experience has been captured!' });
                     
                }
                   
                       
        
        });
        
        });

        // route to extract coffee ratings
        router.get('/getAllRatings',function(req,res){
            coffeeRating.find(function(err,rating){
                if(err) res.send(err);
                else res.json(rating);
            })
        });

        //route to extract coffee ratings by coffeeshop
         router.get('/getRatingsByCoffeeShop/:coffeeShop',function(req,res,next){
               coffeeRating.find({'coffeeShop':req.params.coffeeShop},function(err,rating){
                    if(err) return next(err);
                    if(!rating) return res.send({message:"no rating for selected coffee shop so far"});
                    res.json(rating);
                })
            });

        router.get('/getRatingsByCoffee/:coffeeName',function(req,res,next){
               coffeeRating.find({'coffeeName':req.params.coffeeName},function(err,rating){
                    if(err) return next(err);
                    if(!rating) return res.send({message:"no rating for selected coffee drink so far"});
                    res.json(rating);
                })
            });

      
        app.use('/api',router);
        
        //route to frontend
        app.get('/',function(req,res){
            res.sendfile('public/app/views/index.html')
        });

        app.listen(config.port,function(err){
            if(err) console.log(err);
            else console.log("listening on port"+ config.port);
        });
