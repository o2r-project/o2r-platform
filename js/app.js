 var app = angular.module('starter', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'templates/home.html',
                controller  : 'HomeCtrl'
            })

            // route for the home page
            .when('/reader', {
                templateUrl : 'templates/reader.html',
                controller  : 'ReaderCtrl'
            })

            // route for the about page
            .when('/author', {
                templateUrl : 'templates/author.html',
                controller  : 'AuthorCtrl'
            });
    });
    
    app.controller('MainCtrl', function($scope){
    	
    });
    
    app.controller('HomeCtrl', function($scope){
    	
    });

    app.controller('ReaderCtrl', function($scope) {

    });

    app.controller('AuthorCtrl', function($scope, publications) {
		$scope.publications = publications.getPublications();
    });

