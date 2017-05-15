(function(){
    'use strict';

    angular
        .module('starter', [
            "conf",
            "starter.o2rDisplayFiles",
            "starter.o2rCompare",
            "starter.o2rHttp",
            "treeControl",
            "hljs",
            "ui.router", 
            "ngFileUpload", 
            'ngAnimate',
            'ngAria', 
            'ngMaterial',
            'ngMessages',
            'angulartics', 
            'angulartics.piwik',
            'angularUtils.directives.dirPagination',
            'ngProgress',
            'ngIframeResizer',
            'ui-leaflet'])
        .constant('icons', icons())
        .config(config);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$logProvider', '$analyticsProvider', 'hljsServiceProvider', '$compileProvider', '$mdDateLocaleProvider','$sceDelegateProvider', 'env'];

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $logProvider, $analyticsProvider, hljsServiceProvider, $compileProvider, $mdDateLocaleProvider, $sceDelegateProvider, env){
        $compileProvider.preAssignBindingsEnabled(true);
        
        $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://markuskonkol.shinyapps.io/main/', 'https://markuskonkol.shinyapps.io/mjomeiAnalysis2/']);
        /* eslint-disable angular/window-service, angular/log */
        $analyticsProvider.developerMode(env.disableTracking);
        if(env.disableTracking) console.log("Tracking globally disabled!");

        $logProvider.debugEnabled(env.enableDebug);
        if(!env.enableDebug) console.log('Debug logs disabled!');
        /* eslint-enable angular/window-service, angular/log */

        hljsServiceProvider.setOptions({
            tabReplace: '    '
        });

        $mdDateLocaleProvider.formatDate = function(date){
            return moment(date).format('DD-MM-YYYY');
        };

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
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('erc', {
                url: "/erc/:ercid",
                templateUrl: "app/ercView/erc.html",
                controller: 'ErcController',
                controllerAs: 'vm',
                resolve: {
                    compInfo: compInfoService,
                    compFJob: compFJobService,
                    compSJob: compSJobService
                }
            })
            .state('creationProcess', {
                abstract: true,
                url: "/creationProcess/:ercid",
                templateUrl: "app/creationProcess/creationProcess.html",
                controller: "CreationProcessController",
                controllerAs: "cpctrl"
            })            
            .state('requiredMetadata',{
                url:"/requiredMetadata",
                parent: "creationProcess",
                templateUrl: "app/creationProcess/requiredMetadata.html",
                controller: 'RequiredMetaController',
                controllerAs: 'requiredctrl'    
            })
            .state('optionalMetadata',{
                url:"/optionalMetadata",
                parent: "creationProcess",
                templateUrl: "app/creationProcess/optionalMetadata.html",
                controller: 'OptionalMetaController',
                controllerAs: 'vm'    
            })      
            .state('spacetimeMetadata',{
                url:"/spacetimeMetadata",
                parent: "creationProcess",
                templateUrl: "app/creationProcess/spacetimeMetadata.html",
                controller: 'SpaceTimeController',
                controllerAs: 'vm'    
            }) 
            .state('uibindings',{
                url:"/uibindings",
                parent: "creationProcess",
                templateUrl: "app/creationProcess/uibindings.html",
                controller: 'UIBindings',
                controllerAs: 'vm'    
            })                                    
            .state('author', {
                url: "/author/:authorid",
                templateUrl: "app/authorView/author.html",
                controller: 'AuthorController',
                controllerAs: 'vm',
                resolve: {
                    authorInfo: authorInfoService
                }
            })
            .state('search', {
                url: "/search?q",
                templateUrl: "app/searchView/search.html",
                controller: 'SearchController',
                controllerAs: 'vm',
                resolve: {
                    searchResults: searchResultsService
                }
            })
            .state('examine', {
                url: "/examine/:ercid",
                templateUrl: "app/examineView/examine.html",
                controller: 'ExamineController',
                controllerAs: 'vm',
                resolve: {
                    examine: examineService
                }
            })
            /*
            .state('examine.compare', {
                //url: "/compare?left&right&lmime&rmime",
                templateUrl: "app/compareView/compare.html",
                controller: 'CompareController',
                controllerAs: 'vm'
            })
            */
            .state('examine.inspect', {
                templateUrl: "app/inspectView/inspect.html",
                controller: 'InspectController',
                controllerAs: 'vm'
            })
            .state('examine.manipulate', {
                templateUrl: "app/manipulateView/manipulate.html",
                controller: 'ManipulateController',
                controllerAs: 'vm'
            })
            .state('examine.substitute', {
                templateUrl: "app/substituteView/substitute.html",
                controller: 'SubstituteController',
                controllerAs: 'vm'
            })
            .state('compareanalysis', {
                url: "/compare/analysis?o&r&d&om&rm&dm",
                templateUrl: "app/compareAnalysisView/compareAnalysis.html",
                controller: "CompareAnalysisController",
                controllerAs: 'vm'
            })
            .state('impressum', {
                url: "/impressum",
                templateUrl: "app/templates/impressum.html",
                controller: 'ImpressumController',
                controllerAs: 'vm'
            })
            .state('privacy', {
                url: "/privacy",
                templateUrl: "app/templates/privacy.html",
                controller: 'PrivacyController',
                controllerAs: 'vm'
            })
            .state('404', {
                url: "/404",
                templateUrl: "app/templates/404.html"
            });
    }

    function icons(){
        var path = 'img/ic_';
        var path2 = '_48px.svg';
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
            {name: 'info_outline', category: 'action', fn: 'info_outline'},
            {name: 'rowing', category: 'action', fn: 'rowing'},
            {name: 'add', category: 'content', fn: 'add'},
            {name: 'edit', category: 'editor', fn: 'mode_edit'},
            {name: 'lock_open', category: 'action', fn: 'lock_open'},
            {name: 'lock_outline', category: 'action', fn: 'lock_outline'}
        ];

        for(var i in icons){
            
            object[icons[i].name] = path + icons[i].fn + path2;
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
            compendium_id: ercId
            //status: 'success'
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

    examineService.$inject = ['$log', '$stateParams', 'publications'];
    function examineService($log, $stateParams, publications){
        var ercId = $stateParams.ercid;
        $log.debug('called /examine/%s', ercId);
        return publications.getRequest(ercId);
    }
})();  