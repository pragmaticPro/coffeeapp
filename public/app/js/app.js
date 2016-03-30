var myapp = angular.module('myapp',['ngRoute','ngMessages','ngResource','coffeeService']);

myapp.config(function($routeProvider,$locationProvider){

            $routeProvider
            .when("/doRating",{
               templateUrl:'doRating.html',
                controller:'doRatingController'
            })
            .when("/viewRating",{
                templateUrl:'viewRating.html',
                controller:'viewRatingController'
            })
           

        });
myapp.controller('doRatingController',['$scope','$http','Coffee',function($scope,$http,Coffee){
    
        $scope.ratingData ={};
        $scope.registerCoffeeExperience = function(){
    
           Coffee.registerCoffeeExperience($scope.ratingData)
                .success(function(data){
                    $scope.ratingData={};
                    $scope.message = data.message;
                    console.log("message"+ data.message);
                   
               })

               .error(function(data){
                        console.log("message"+ data);
                });

            }
        
    
}]);

myapp.controller('viewRatingController',['$scope','$http','Coffee',function($scope,$http,Coffee){
    
    $scope.viewAllRatings = function(){
        Coffee.getAllRatings()
            .success(function(data){
               $scope.ratings = data;      
            })
            .error(function(data){
            console.log("error"+ data);
            })
    };
    
    $scope.viewRatingsByCoffeeShop = function(coffeeShop){
        Coffee.getRatingsByCoffeeShop(coffeeShop)
            .success(function(data){
                $scope.ratings = data;
            })
            .error(function(data){
                console.log("error"+ data);    
            })
    };
    
    $scope.viewRatingsByCoffee = function(coffeeName){
        Coffee.getRatingsByCoffee(coffeeName)
            .success(function(data){
                $scope.ratings = data;
            })
            .error(function(data){
                console.log("error"+ data);
            })
    };
    
    
}]);