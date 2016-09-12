(function(){
    'use strict';
    
    angular
        .module('starter', [
            "treeControl",
            "ui.router", 
            "hljs", 
            "ngFileUpload", 
            'ngAnimate', 
            'ui.bootstrap',
            'angulartics', 
            'angulartics.piwik'])
        .config(config);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider', 'hljsServiceProvider', '$analyticsProvider', 'disableTracking'];

    function config($stateProvider, $urlRouterProvider, hljsServiceProvider, $analyticsProvider, disableTracking){
        $analyticsProvider.developerMode(disableTracking);
        if(disableTracking) console.log("Tracking globally disabled!");

      hljsServiceProvider.setOptions({
        tabReplace: '    '
      });
      $urlRouterProvider.otherwise("/home"); // For any unmatched url, send to /route1
      $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "app/homeView/home.html",
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        })
        .state('erc', {
            url: "/erc/:ercid",
            templateUrl: "app/ercView/erc.html",
            controller: 'ErcCtrl',
            controllerAs: 'vm'
        })
        .state('author', {
            url: "/author/:authorid",
            templateUrl: "app/authorView/author.html",
            controller: 'AuthorCtrl',
            controllerAs: 'vm'
        })
        .state('search', {
            url: "/search?term",
            templateUrl: "app/searchView/search.html",
            controller: 'SearchCtrl',
            controllerAs: 'vm'
        })
        .state('impressum', {
            url: "/impressum",
            templateUrl: "app/templates/impressum.html"
        })
        .state('privacy', {
            url: "/privacy",
            templateUrl: "app/templates/privacy.html"
        });
    }
})();  