/**
 * Directive for showing the status of last finished and last started analysis.
 * Expects 3 params:
 * o2r-finished: object containing metadata about finished job
 * o2r-started: object containing metadata about started/running job
 * o2r-ercid: id of compendium
 * Example:
 * <o2r-analysis-stats o2r-finished="{foo:'bar'}" o2r-started="{foo: 'bar'}" o2r-ercid="xcv12"></o2r-analysis-stats>
 */

(function(){
    'use strict';

    angular
        .module('starter')
        .directive('o2rAnalysisStats', o2rAnalysisStats);

    o2rAnalysisStats.$inject = ['$rootScope','$log', 'jobs', 'icons', 'socket', '$mdDialog'];
    function o2rAnalysisStats($rootScope, $log, jobs, icons, socket, $mdDialog){
        return{
            restrict: 'E',
            scope: {
                lFinished: '@o2rFinished',
                lStarted: '@o2rStarted',
                ercId: '@o2rErcid'
            },
            templateUrl: 'app/analysisStatsView/o2rAnalysisStats.template.html',
            link: link
        };

        function link(scope){
            var iconClass = {
                validate_bag: {
                    started: {
                        'o2r-green-icon' : false,
                        'o2r-red-icon': false
                    },
                    finished: {
                        'o2r-green-icon': false,
                        'o2r-red-icon': false
                    }
                },
                validate_compendium: {
                    started: {
                        'o2r-green-icon' : false,
                        'o2r-red-icon': false
                    },
                    finished: {
                        'o2r-green-icon': false,
                        'o2r-red-icon': false
                    }
                },
                image_prepare: {
                    started: {
                        'o2r-green-icon' : false,
                        'o2r-red-icon': false
                    },
                    finished: {
                        'o2r-green-icon': false,
                        'o2r-red-icon': false
                    }
                },
                image_build: {
                    started: {
                        'o2r-green-icon' : false,
                        'o2r-red-icon': false
                    },
                    finished: {
                        'o2r-green-icon': false,
                        'o2r-red-icon': false
                    }
                },
                image_execute: {
                    started: {
                        'o2r-green-icon' : false,
                        'o2r-red-icon': false
                    },
                    finished: {
                        'o2r-green-icon': false,
                        'o2r-red-icon': false
                    }
                },
                cleanup: {
                    started: {
                        'o2r-green-icon' : false,
                        'o2r-red-icon': false
                    },
                    finished: {
                        'o2r-green-icon': false,
                        'o2r-red-icon': false
                    }
                }
            };
            
            scope.icons = icons;
            scope.checkIcon = checkIcon;
            scope.iconClass = iconClass;
            scope.execJob = ex;
            scope.gotSocket = false;
            scope.resultInfo = resultInfo;
            scope.isRunning = isRunning;
            scope.showDialog = showDialog;
            scope.isEmpty = isEmpty;
            // delete dummy object after metadata object was updated
            scope.dummy = {};
            scope.dummy.o = {};
            scope.dummy.o.path = 'api/v1/compendium/' + scope.$parent.vm.ercId + '/data/data/Original.html';
            scope.dummy.r = {};
            scope.dummy.r.path = 'api/v1/compendium/' + scope.$parent.vm.ercId + '/data/data/Reproduced.html';
            scope.dummy.d = {};
            scope.dummy.d.path = 'api/v1/compendium/' + scope.$parent.vm.ercId + '/data/data/Checker_Result.html';

            activate();

            ////////

            scope.$on('set liveStatus', function(event, data){
                $log.debug(data);
                scope.lStar = data;
            });

            function activate(){
                try {
                    scope.lFin = angular.fromJson(scope.lFinished); //JSON.parse(scope.lFinished);
                } catch (error) {
                    $log.debug('No finished jobs. Set last finished Job to {}');
                    scope.lFin = {};
                }

                try {
                    scope.lStar = angular.fromJson(scope.lStarted); //JSON.parse(scope.lStarted);
                } catch (error) {
                    $log.debug('No currently running job. Set last started Job to {}');
                    scope.lStar = {};
                }

                socket.on('document', function(data){
                    scope.gotSocket = true;
                    if(data.hasOwnProperty('steps')){
                        stepUpdater(data, scope.lStar.steps);
                    } else if (data.hasOwnProperty('status')){
                        $log.debug('setting overall status to %s', data.status);
                        scope.lStar.status = data.status;
                    }
                });

                socket.on('set', function(data){
                    scope.gotSocket = true;
                    if(data.hasOwnProperty('steps')){
                        stepUpdater(data, scope.lStar.steps);
                    } else if (data.hasOwnProperty('status')){
                        $log.debug('setting overall status to %s', data.status);
                        scope.lStar.status = data.status;
                    }
                });

            }

            function ex(){
                scope.lStar = {};
                scope.lStar.steps = {
                    validate_bag: {
                        status: ''
                    },
                    validate_compendium: {
                        status: ''
                    },
                    image_prepare: {
                        status: ''
                    },
                    image_build: {
                        status: ''
                    },
                    image_execute: {
                        status: ''
                    },
                    cleanup: {
                        status: ''
                    }
                };
                scope.lStar.status = '';
                jobs.executeJob(scope.$parent.vm.ercId);
            }

            function checkIcon(status, step, pos){
                var icon;
                switch(status){
                    case 'success':
                        icon = scope.icons.done;
                        iconClass[step][pos]['o2r-green-icon'] = true;
                        iconClass[step][pos]['o2r-red-icon'] = false;
                        break;
                    case 'failure':
                        icon = scope.icons.fail;
                        iconClass[step][pos]['o2r-green-icon'] = false;
                        iconClass[step][pos]['o2r-red-icon'] = true;
                        break;
                    default:
                        icon = null;
                        iconClass[step][pos]['o2r-green-icon'] = false;
                        iconClass[step][pos]['o2r-red-icon'] = false;
                        break;
                }
                return icon;
            }

            function resultInfo(obj){
                var result;
                var states = {
                    success: 'Analysis finished successfully.',
                    failure: 'Analysis failed.',
                    running: 'Analysis is running.'
                };
                switch(obj){
                    case 'success':
                        result = states.success;
                        break;
                    case 'failure':
                        result = states.failure;
                        break;
                    default:
                        result = states.running;
                        break;
                }
                return result;                
            }

            function stepUpdater(data, o){
                if(data.steps.hasOwnProperty('cleanup')){
                    o.cleanup.status = data.steps.cleanup.status;
                    $log.debug('updated cleanup to %o', data.steps.cleanup.status);
                    $rootScope.progressbar.complete();
                } else if(data.steps.hasOwnProperty('image_execute')){
                    if(data.steps.image_execute.hasOwnProperty('status')){
                        o.image_execute.status = data.steps.image_execute.status;
                        $log.debug('updated image_execute to %o', data.steps.image_execute.status);
                    }
                } else if(data.steps.hasOwnProperty('image_build')){
                    if(data.steps.image_build.hasOwnProperty('status')){
                        o.image_build.status = data.steps.image_build.status;
                        $log.debug('updated image_build to %o', data.steps.image_build.status);
                    }
                } else if(data.steps.hasOwnProperty('validate_bag')){
                    o.validate_bag.status = data.steps.validate_bag.status;
                    $log.debug('updated validate_bag to %o', data.steps.validate_bag.status);
                } else if(data.steps.hasOwnProperty('validate_compendium')){
                    o.validate_compendium.status = data.steps.validate_compendium.status;
                    $log.debug('updated validate_compendium to %o', data.steps.validate_compendium.status);
                } else if(data.steps.hasOwnProperty('image_prepare')){
                    o.image_prepare.status = data.steps.image_prepare.status;
                    $log.debug('updated image_prepare to %o', data.steps.image_prepare.status);
                }
                return;
            }

            function isRunning(o){
                if(o == 'running') return true;
                return false;
            }

            function showDialog(ev){
                $mdDialog.show({
                    controller: 'CompareAnalysisController',
                    controllerAs: 'vm',
                    templateUrl: 'app/compareAnalysisView/compareAnalysis.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    fullscreen: true,
                    clickOutsideToClose: true
                });
            }

            function isEmpty(obj){
                for(var key in obj){
                    if(obj.hasOwnProperty(key)) return false;
                }
                return true;
            }
        }
    }
})();