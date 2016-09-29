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
                controllerAs: 'vm',
                resolve: {
                    compInfo: compInfoService
                }
            })
            .state('author', {
                url: "/author/:authorid",
                templateUrl: "app/authorView/author.html",
                controller: 'AuthorCtrl',
                controllerAs: 'vm',
                resolve: {
                    authorInfo: authorInfoService
                }
            })
            .state('search', {
                url: "/search?term",
                templateUrl: "app/searchView/search.html",
                controller: 'SearchCtrl',
                controllerAs: 'vm',
                resolve: {
                    searchResults: searchResultsService
                }
            })
            .state('impressum', {
                url: "/impressum",
                templateUrl: "app/templates/impressum.html"
            })
            .state('privacy', {
                url: "/privacy",
                templateUrl: "app/templates/privacy.html"
            })
            .state('404', {
                url: "/404",
                templateUrl: "app/templates/404.html"
            });
    }

    authorInfoService.$inject = ['$stateParams', 'metadata'];
    function authorInfoService($stateParams, metadata){
        var id = $stateParams.authorid;
        console.log('authorInfoService, authorid: ' + id);
        return metadata.callMetadata_author(id);
    }

    compInfoService.$inject = ['$stateParams', 'publications', 'ercView'];
    function compInfoService($stateParams, publications, ercView){
        var ercId = $stateParams.ercid;
        console.log('compInfoService, ercid: ' + ercId);
        ercView.callJobs(ercId);
        return publications.getRequest(ercId);
    }

    searchResultsService.$inject = ['$stateParams', 'metadata'];
    function searchResultsService($stateParams, metadata){
        var term = $stateParams.term;
        console.log('searchResultsService, term: ' + term);
        return metadata.callMetadata_search(term);
    }
})();  