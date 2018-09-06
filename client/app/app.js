(function(){
    'use strict';

    angular
        .module('starter', [
            "conf",
            "starter.o2rCodeHighlight",
            "starter.o2rDisplayFiles",
            "starter.o2rSubstituteCandidate",
            "starter.o2rSubstituteMagnify",
            "starter.o2rCompareBaseSubst",
            "starter.o2rCompare",
            "starter.o2rHttp",
            "starter.o2rInspect",
            "starter.o2rErcDownload",
            "starter.o2rMetadataView",
            "starter.o2rRecipient",
            "starter.o2rUiBindingCreator",
            'starter.o2rSpacetime',
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
            'rzModule',
            'ui-leaflet',
            'angular-logger',
            'angular-intro',
            'ngCookies',
            'ngSanitize',
            'elasticsearch',
            'md.data.table',
            'ngTextTruncate'])
        .constant('icons', icons())
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$logProvider', '$analyticsProvider', 'hljsServiceProvider', '$compileProvider', '$mdDateLocaleProvider','$sceDelegateProvider', 'env', 'logEnhancerProvider'];

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $logProvider, $analyticsProvider, hljsServiceProvider, $compileProvider, $mdDateLocaleProvider, $sceDelegateProvider, env, logEnhancerProvider){
        $compileProvider.preAssignBindingsEnabled(true);

        $sceDelegateProvider.resourceUrlWhitelist(['self']);
        /* eslint-disable angular/window-service, angular/log */
        $analyticsProvider.developerMode(env.disableTracking);
        if(env.disableTracking) console.log("Tracking globally disabled!");

        $logProvider.debugEnabled(env.enableDebug);
        logEnhancerProvider.prefixPattern = '%2$s: ';
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

        $urlRouterProvider.when('', '/home');
        $urlRouterProvider.when('/', '/home');
        $urlRouterProvider.otherwise("/404"); // For any unmatched url, send to /404
        $stateProvider
            .state('home', {
                url: "/home?inspect",
                templateUrl: "app/homeView/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('creationProcess', {
                url: "/creationProcess/:ercid",
                templateUrl: "app/creationProcess/creationProcess.html",
                controller: "CreationProcessController",
                controllerAs: "vm",
                resolve: {
                    creationService: creationService
                },
                onExit: function(creationObject){
                    creationObject.destroy();
                }
            })
            .state('creationProcess.requiredMetadata', {
                templateUrl: "app/creationProcess/requiredMetadata.html",
                controller: 'RequiredMetaController',
                controllerAs: 'vm'
            })
            .state('creationProcess.spacetimeMetadata', {
                templateUrl: "app/creationProcess/spacetimeMetadata.html"
            })
            .state('creationProcess.uibindings', {
                templateUrl: "app/creationProcess/uibindings.html",
                controller: 'UIBindingsController',
                controllerAs: 'vm'
            })
            .state('author', {
                url: "/author/:authorid",
                templateUrl: "app/authorView/author.html",
                controller: 'AuthorController',
                controllerAs: 'vm',
                resolve: {
                    authorInfo: authorInfoService,
                    author: authorService
                }
            })
            .state('search', {
                url: "/search?q&coords&from&to&start&size&libraries",
                templateUrl: "app/searchView/search.html",
                controller: 'SearchController',
                controllerAs: 'vm',
                resolve: {
                    searchAll: searchAllService,
                    searchResults: searchResultsService
                }
            })
            .state('erc', {
                url: "/erc/:ercid",
                templateUrl: "app/ercView/erc.html",
                controller: 'ErcController',
                controllerAs: 'vm',
                resolve: {
                    erc: ercService,
                    recipient: recipientService,
                    compFJobSuccess: compFJobSuccessService,
                    shipmentInfo : shipmentInfoService
                }
            })
            .state('erc.reproduce', {
                templateUrl: "app/reproduceView/reproduce.html",
                controller: 'ReproduceController',
                controllerAs: 'vm',
                resolve: {
                    compFJob: compFJobService,
                    compSJob: compSJobService
                }
            })
            .state('erc.inspect', {
                templateUrl: "app/inspectView/inspect.html",
                controller: 'InspectController',
                controllerAs: 'vm'
            })
            .state('erc.manipulate', {
                templateUrl: "app/manipulateView/manipulate.html",
                controller: 'ManipulateController',
                controllerAs: 'vm'
            })
            .state('erc.substitute', {
                templateUrl: "app/substituteView/substitute.html",
                controller: 'SubstituteController',
                controllerAs: 'vm',
                resolve: {
                    substituteInfoService: substituteInfoService
                }
            })
            .state('compareanalysis', {
                url: "/compare/analysis?o&r&d&om&rm&dm",
                templateUrl: "app/compareAnalysisView/compareAnalysis.html",
                controller: "CompareAnalysisController",
                controllerAs: 'vm'
            })
            .state('admin', {
                url: "/admin",
                templateUrl: "app/adminView/admin.html",
                controller: "AdminController",
                controllerAs: 'vm',
                resolve: {
                    admin: adminService
                }
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
            .state('explore', {
                url: "/explore",
                templateUrl: "app/searchView/exploreERC.html",
                controller: 'ExploreController',
                controllerAs: 'vm'
            })
            .state('404', {
                url: "/404",
                templateUrl: "app/templates/404.html"
            });
    }

    run.$inject = ['$rootScope', '$state', '$log'];
    function run($rootScope, $state, $log){
        var logger = $log.getInstance('Run');
        $rootScope.$on('$stateChangeError', function(event) {
            logger.info('stateChangeError fired');
            event.preventDefault();
            return $state.go('404');
        });
    }

    function icons(){
        var path = 'img/ic_';
        var path2 = '_48px.svg';
        var path3 = '_24px.svg';
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
            {name: 'run', category: 'av', fn: 'play_circle_outline'},
            {name: 'skip', category: 'av', fn: 'not_interested'},
            {name: 'forward', category: 'content', fn: 'forward'},
            {name: 'info_outline', category: 'action', fn: 'info_outline'},
            {name: 'rowing', category: 'action', fn: 'rowing'},
            {name: 'add', category: 'content', fn: 'add'},
            {name: 'remove', category: 'content', fn: 'remove'},
            {name: 'edit', category: 'editor', fn: 'mode_edit'},
            {name: 'lock_open', category: 'action', fn: 'lock_open'},
            {name: 'lock_outline', category: 'action', fn: 'lock_outline'},
            {name: 'navigate_next', category: 'image', fn: 'navigate_next'},
            {name: 'navigate_before', category: 'image', fn: 'navigate_before'},
            {name: 'required', category: 'action', fn: 'assignment_late'},
            {name: 'graph', category: 'action', fn: 'assessment'},
            {name: 'assignment', category: 'action', fn: 'assignment'},
            {name: 'compass', category: 'action', fn: 'explore'},
            {name: 'highlight_off', category: 'toggle', fn: 'highlight_off'},
            {name: 'folder', category: 'file', fn: 'folder'},
            {name: 'preview', category: 'action', fn: 'visibility'},
            {name: 'substitution_options', category: 'action', fn: 'swap_horiz_black'},
            {name: 'backArrow', category: 'navigation', fn: 'arrow_back'},
            {name: 'cloudUpload', category: 'file', fn: 'cloud_upload'},
            {name: 'cloudDone', category: 'file', fn: 'cloud_done'},
            {name: 'cloudQueue', category: 'file', fn: 'cloud_queue'},
            {name: 'shuffle', category: 'navigation', fn: 'shuffle'},
            {name: 'cut', category: 'content', fn: 'cut'}
        ];

        for(var i in icons){
            object[icons[i].name] = path + icons[i].fn + path2;
            object[icons[i].name + '_small'] = path + icons[i].fn + path3;
        }

        return object;
    }

    authorInfoService.$inject = ['$stateParams', '$log', '$q', 'metadata', 'httpRequests'];
    function authorInfoService($stateParams, $log, $q, metadata, httpRequests){
        var logger = $log.getInstance('authorInfo');
        var id = $stateParams.authorid;
        logger.info('authorid: ' + id);
        return httpRequests.getSingleUser(id)
            .then(function(result){
                logger.info(result);
                return metadata.callMetadata_author(id);
            })
            .catch(function(e){
                logger.info(e);
                return $q.reject(e.statusText);
            });
    }

    authorService.$inject = ['$stateParams', '$q', 'httpRequests'];
    function authorService($stateParams, $q, httpRequests){
        var id = $stateParams.authorid;
        return httpRequests.getSingleUser(id)
            .then(function(result){
                if(result.status == 404){
                    return $q.reject('404 Not Found');
                } else return result;
            });
    }

    compInfoService.$inject = ['$stateParams', '$log', '$q', 'publications'];
    function compInfoService($stateParams, $log, $q, publications){
        var ercId = $stateParams.ercid;
        $log.debug('compInfoService, ercid: ' + ercId);
        return publications.getRequest(ercId).then(function(result){
            if(result.status == 404){
                return $q.reject('404 Not Found');
            }
            else return result;
        });
    }

    //TODO
    //query param status might need to be changed to filter all finished jobs
    compFJobService.$inject = ['$stateParams', '$q', 'jobs'];
    function compFJobService($stateParams,$q, jobs){
        var ercId = $stateParams.ercid;
        var query = {
            compendium_id: ercId
            //status: 'success'
        };
        return jobs.callJobs(query).then(function(result){
            if(result.status == 404){
                return $q.reject('404 Not Found');
            }
            else return result;
        });
    }

    //query param status might need to be changed to filter all finished jobs
    compFJobSuccessService.$inject = ['$stateParams', '$q', 'jobs'];
    function compFJobSuccessService($stateParams,$q, jobs){
        var ercId = $stateParams.ercid;
        var query = {
            compendium_id: ercId
            // status: 'success'
        };
        return jobs.callJobs(query).then(function(result){
            if(result.status == 404){
                logger.info("No jobs finished in substituted ERC.\nPlease run analysis.");
                return $q.reject('404 Not Found');
            }
            else {
                if (result.data == "No analysis executed yet.") {
                    return result;
                } else {
                    if (result.data.steps.check.status == "failure" || result.data.steps.check.status == "success") {
                        return result;
                    } else return {data: "No analysis finished that provides a html file for comparison reasons."};
                }
            }
        });
    }

    compSJobService.$inject = ['$stateParams', '$q', 'jobs'];
    function compSJobService($stateParams, $q, jobs){
        var ercId = $stateParams.ercid;
        var query = {
            compendium_id: ercId,
            status: 'running'
        };
        return jobs.callJobs(query).then(function(result){
            if(result.status == 404){
                return $q.reject('404 Not Found');
            }
            else return result;
        });
    }

    shipmentInfoService.$inject = ['$stateParams', '$q', 'httpRequests'];
    function shipmentInfoService($stateParams, $q, httpRequests){
        var deferred = $q.defer();
        var ercId = $stateParams.ercid;
        var result = [];
        httpRequests.getCompShipments(ercId)
            .then(function(response){
                var counter = 0;
                if(response.data.length === 0) deferred.resolve({data: []});
                else {
                    for(var i in response.data){
                        httpRequests.getShipment(response.data[i])
                        .then(function(res){
                            result.push(res.data);
                            counter++;
                            if(counter == response.data.length){
                                deferred.resolve(result);
                            }
                        },function(error) {
                            $log.debug('Error getting shipments for %s', response.data[i]);
                        });
                    }
                }
            });
        return deferred.promise;
    }

    searchAllService.$inject = ['search'];
    function searchAllService(search){
        var index = 'o2r';
        var query = search.prepareQuery(index);
        return search.search(query);
    }

    searchResultsService.$inject = ['$stateParams', '$log', '$q', 'metadata', 'search'];
    function searchResultsService($stateParams, $log, $q, metadata, search){
        var logger = $log.getInstance('searchResultsService');
        var index = 'o2r';
        logger.info('param: ', $stateParams);
        var term, coords, from, to, start,libraries, size = null;
        if($stateParams.q) term = $stateParams.q;
        if($stateParams.coords) coords = angular.fromJson($stateParams.coords);
        if($stateParams.from) from = angular.fromJson($stateParams.from);
        if($stateParams.to) to = angular.fromJson($stateParams.to);
        if($stateParams.start) start = angular.fromJson($stateParams.start);
        if($stateParams.size) size = angular.fromJson($stateParams.size);
        if($stateParams.libraries) libraries = angular.fromJson($stateParams.libraries);
        var query = search.prepareQuery(index, term, coords, from, to, start, size, libraries);
        return search.search(query);
    }

    // provides metadata for all compendia TODO #1 (substitution): not all but similar compendia
    substituteInfoService.$inject = ['$log', '$q', 'metadataSimComp'];
    function substituteInfoService($log, $q, metadataSimComp){
        $log.debug('substituteInfoService');
        return metadataSimComp.callMetadata_simComp().then(function(result){
            if(result.status == 404){
                return $q.reject('404 Not Found');
            }
            else {
              return result;
            }
      });
    }

    ercService.$inject = ['$log', '$stateParams', '$q', 'publications'];
    function ercService($log, $stateParams, $q, publications){
        var ercId = $stateParams.ercid;
        $log.debug('GET /erc/%s', ercId);
        return publications.getRequest(ercId).then(function(result){
            if(result.status == 404){
                return $q.reject('404 Not Found');
            }
            else return result;
        });
    }

    recipientService.$inject = ['$log', '$q', 'httpRequests'];
    function recipientService($log, $q, httpRequests){
        $log.debug('GET /recipient/');
        return httpRequests.getRecipient();
    }

    creationService.$inject = ['$log', '$stateParams', '$q', 'publications'];
    function creationService($log, $stateParams, $q, publications){
        var ercId = $stateParams.ercid;
        $log.debug('GET /erc/%s', ercId);
        return publications.getRequest(ercId).then(function(result){
            if(result.status == 404){
                return $q.reject('404 Not Found');
            }
            else return result;
        });
    }

    adminService.$inject = ['$log', 'httpRequests'];
    function adminService($log, httpRequests){
        return httpRequests.getAllUsers();
    }
})();
