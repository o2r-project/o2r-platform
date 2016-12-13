(function(){
    'use strict';
    
    window.__env = window.__env || {};

    var env = {
        server : window.__env.server || 'http://localhost',
        c_api: window.__env.api || '/api/v1',
        sizeRestriction: window.__env.sizeRestriction || 10000000,
        disableTracking: window.__env.disableTracking || false,
        enableDebug: window.__env.enableDebug || false,
        version: window.__env.version || 'deployment'
    };
    env.api = env.server + env.c_api;

    angular
        .module('starter', [
            "treeControl",
            "ui.router", 
            "hljs", 
            "ngFileUpload", 
            'ngAnimate',
            'ngAria', 
            'ngMaterial',
            'angulartics', 
            'angulartics.piwik',
            'angularUtils.directives.dirPagination'])
        .constant('env', env)
        .constant('icons', icons())
        .config(config);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$logProvider', 'hljsServiceProvider', '$analyticsProvider'];

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $logProvider, hljsServiceProvider, $analyticsProvider){
        $analyticsProvider.developerMode(window.__env.disableTracking);
        if(window.__env.disableTracking) console.log("Tracking globally disabled!");

        $logProvider.debugEnabled(window.__env.enableDebug);

        hljsServiceProvider.setOptions({
            tabReplace: '    '
        });

        var customPrimary = {
            '50': '#0681ff',
            '100': '#0074ec',
            '200': '#0068d2',
            '300': '#005bb9',
            '400': '#004f9f',
            '500': '#004286',
            '600': '#00356c',
            '700': '#002953',
            '800': '#001c39',
            '900': '#001020',
            'A100': '#208eff',
            'A200': '#399bff',
            'A400': '#53a8ff',
            'A700': '#000306'
        };
        $mdThemingProvider
            .definePalette('customPrimary', customPrimary);

        var customAccent = {
            '50': '#000000',
            '100': '#0a0a0c',
            '200': '#15161b',
            '300': '#212229',
            '400': '#2c2e37',
            '500': '#383945',
            '600': '#4e5161',
            '700': '#5a5c6f',
            '800': '#65687d',
            '900': '#71748b',
            'A100': '#4e5161',
            'A200': '#434553',
            'A400': '#383945',
            'A700': '#7e8197'
        };
        $mdThemingProvider
            .definePalette('customAccent', customAccent);

        var customWarn = {
            '50': '#e43e49',
            '100': '#e12734',
            '200': '#d11d29',
            '300': '#bb1a25',
            '400': '#a41720',
            '500': '#8e141c',
            '600': '#781118',
            '700': '#610e13',
            '800': '#4b0b0f',
            '900': '#35070a',
            'A100': '#e7545e',
            'A200': '#ea6a73',
            'A400': '#ed8188',
            'A700': '#1e0406'
        };
        $mdThemingProvider
            .definePalette('customWarn', customWarn);

        var customBackground = {
            '50': '#dedede',
            '100': '#d1d1d1',
            '200': '#c4c4c4',
            '300': '#b7b7b7',
            '400': '#ababab',
            '500': '#9E9E9E',
            '600': '#919191',
            '700': '#848484',
            '800': '#787878',
            '900': '#6b6b6b',
            'A100': '#eaeaea',
            'A200': '#f7f7f7',
            'A400': '#ffffff',
            'A700': '#5e5e5e'
        };
        $mdThemingProvider
            .definePalette('customBackground', customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('grey');
            
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
                    compInfo: compInfoService,
                    compFJob: compFJobService,
                    compSJob: compSJobService
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
                url: "/search?q",
                templateUrl: "app/searchView/search.html",
                controller: 'SearchCtrl',
                controllerAs: 'vm',
                resolve: {
                    searchResults: searchResultsService
                }
            })
            .state('impressum', {
                url: "/impressum",
                templateUrl: "app/templates/impressum.html",
                controller: 'ImpressumCtrl',
                controllerAs: 'vm'
            })
            .state('privacy', {
                url: "/privacy",
                templateUrl: "app/templates/privacy.html",
                controller: 'PrivacyCtrl',
                controllerAs: 'vm'
            })
            .state('404', {
                url: "/404",
                templateUrl: "app/templates/404.html"
            });
    }

    function icons(){
        var path = 'bower_components/material-design-icons/';
        var path2 = '/svg/production/ic_';
        var path3 = '_48px.svg';
        var object = {};
        var icons = [
            {name: 'upload', category: 'file', fn: 'file_upload'},
            {name: 'download', category: 'file', fn: 'file_download'},
            {name: 'upArrow', category: 'navigation', fn: 'arrow_upward'},
            {name: 'downArrow', category: 'navigation', fn: 'arrow_downward'},
            {name: 'menu', category: 'navigation', fn: 'menu'},
            {name: 'close', category: 'navigation', fn: 'close'},
            {name: 'search', category: 'action', fn: 'search'},
            {name: 'copy', category: 'av', fn: 'library_books'},
            {name: 'done', category: 'action', fn: 'done'},
            {name: 'fail', category: 'content', fn: 'clear'},
            {name: 'forward', category: 'content', fn: 'forward'},
            {name: 'info_outline', category: 'action', fn: 'info_outline'}
        ];

        for(var i in icons){
            
            object[icons[i].name] = path + icons[i].category + path2 + icons[i].fn + path3;
        }
        
        return object;
    }

    authorInfoService.$inject = ['$stateParams', '$log', 'metadata'];
    function authorInfoService($stateParams, $log, metadata){
        var id = $stateParams.authorid;
        $log.debug('authorInfoService, authorid: ' + id);
        return metadata.callMetadata_author(id);
    }

    compInfoService.$inject = ['$stateParams', '$log', 'publications'];
    function compInfoService($stateParams, $log, publications){
        var ercId = $stateParams.ercid;
        $log.debug('compInfoService, ercid: ' + ercId);
        return publications.getRequest(ercId);
    }

    //TODO
    //query param status might need to be changed to filter all finished jobs
    compFJobService.$inject = ['$stateParams', 'jobs'];
    function compFJobService($stateParams, jobs){
        var ercId = $stateParams.ercid;
        var query = {
            compendium_id: ercId,
            status: 'success'
        };
        return jobs.callJobs(query);
    }

    compSJobService.$inject = ['$stateParams', 'jobs'];
    function compSJobService($stateParams, jobs){
        var ercId = $stateParams.ercid;
        var query = {
            compendium_id: ercId,
            status: 'running'
        };
        return jobs.callJobs(query);
    }

    searchResultsService.$inject = ['$stateParams', '$log', 'metadata'];
    function searchResultsService($stateParams, $log, metadata){
        $log.debug('searchResultsService, param: ', $stateParams);
        var term = $stateParams.q;
        $log.debug('searchResultsService, term: ' + term);
        return metadata.callMetadata_search(term);
    }
})();  