angular.module('coffeeService',[])
        
        .factory('Coffee',function($http){
                var coffeeFactory ={};
                 coffeeFactory.registerCoffeeExperience = function(ratingData){
                    return $http.post('/api/registerCoffeeExperience',ratingData)
                };
                coffeeFactory.getAllRatings = function(){
                  return $http.get('/api/getAllRatings') 
                };
                coffeeFactory.getRatingsByCoffeeShop = function(coffeeShop){
                    return $http.get('/api/getRatingsByCoffeeShop/'+coffeeShop)
                };
    
                 coffeeFactory.getRatingsByCoffee = function(coffeeName){
                    return $http.get('/api/getRatingsByCoffee/'+coffeeName)
                };
                 
                return coffeeFactory;
        
        });
        
       
        
    



