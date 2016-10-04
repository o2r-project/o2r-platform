(function(){
    'use strict';
    
    window.__env = window.__env || {};

    var env = {
        api: window.__env.api || 'o2r.uni-muenster.de/api/v1',
        sizeRestriction: window.__env.sizeRestriction || 10000000,
        disableTracking: window.__env.disableTracking || false,
        enableDebug: window.__env.enableDebug || false,
        version: window.__env.version || 'deployment'
    };
        

    angular
        .module('starter', [
            "treeControl",
            "ui.router", 
            "hljs", 
            "ngFileUpload", 
            'ngAnimate', 
            'ngMaterial',
            'angulartics', 
            'angulartics.piwik'])
        .constant('env', env)
        .config(config);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$logProvider', 'hljsServiceProvider', '$analyticsProvider'];

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $logProvider, hljsServiceProvider, $analyticsProvider){
        $analyticsProvider.developerMode(window.__env.disableTracking);
        if(window.__env.disableTracking) console.log("Tracking globally disabled!");

        $logProvider.debugEnabled(window.__env.enableDebug);

        hljsServiceProvider.setOptions({
            tabReplace: '    '
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey');
            
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

    authorInfoService.$inject = ['$stateParams', '$log', 'metadata'];
    function authorInfoService($stateParams, $log, metadata){
        var id = $stateParams.authorid;
        $log.debug('authorInfoService, authorid: ' + id);
        return metadata.callMetadata_author(id);
    }

    compInfoService.$inject = ['$stateParams', '$log', 'publications', 'ercView'];
    function compInfoService($stateParams, $log, publications, ercView){
        var ercId = $stateParams.ercid;
        $log.debug('compInfoService, ercid: ' + ercId);
        ercView.callJobs(ercId);
        return publications.getRequest(ercId);
    }

    searchResultsService.$inject = ['$stateParams', '$log', 'metadata'];
    function searchResultsService($stateParams, $log, metadata){
        var term = $stateParams.term;
        $log.debug('searchResultsService, term: ' + term);
        return metadata.callMetadata_search(term);
    }
})();  