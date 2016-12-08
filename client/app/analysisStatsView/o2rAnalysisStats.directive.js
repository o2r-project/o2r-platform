/**
 * Directive for showing the status of last finished and last started analysis.
 * 
 */

(function(){
    'use strict';

    angular
        .module('starter')
        .directive('o2rAnalysisStats', o2rAnalysisStats);

    o2rAnalysisStats.$inject = ['$log', 'jobs', 'icons', 'socket'];
    function o2rAnalysisStats($log, jobs, icons, socket){
        return{
            restrict: 'E',
            scope: {
                lFinished: '@o2rFinished',
                lStarted: '@o2rStarted'
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
            scope.jobDone = true;
            scope.gotSocket = false;
            scope.resultInfo = resultInfo;
            
            activate();

            ////////

            scope.$on('set liveStatus', function(event, data){
                $log.debug(data);
                scope.lStar = data;
            });

            function activate(){
                try {
                    scope.lFin = JSON.parse(scope.lFinished);
                } catch (error) {
                    $log.debug(error);
                    scope.lFin = {};
                }

                try {
                    scope.lStar = JSON.parse(scope.lStarted);
                    scope.jobDone = jobs.checkStatus(scope.lStar.steps);
                } catch (error) {
                    $log.debug(error);
                    scope.lStar = {};
                }

                socket.on('document', function(data){
                    scope.gotSocket = true;
                    stepUpdater(data, scope.lStar.steps);
                });

                socket.on('set', function(data){
                    $log.debug('socket lStar %s', JSON.stringify(scope.lStar));
                    scope.gotSocket = true;
                    stepUpdater(data, scope.lStar.steps);
                });
            }

            function ex(){
                scope.lStar = new Object();
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
                $log.debug('new lStar: %s', JSON.stringify(scope.lStar));
                scope.jobDone = false;
                scope.lStar = jobs.executeJob(scope.$parent.vm.ercId);
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
                var allSuccess = true;
                var oneFail = false;
                var states = {
                    success: 'Analysis finished successfully.',
                    failure: 'Analysis failed.',
                    running: 'Analysis running'
                };

                for(var step in obj){
                    if(obj[step].status != 'success') allSuccess = false;
                    if(obj[step].status == 'failure') oneFail = true;
                }
                if(allSuccess) return states.success;
                if(oneFail) return states.failure;
                return states.running;                
            }

            function stepUpdater(data, o){
                if(data.steps.cleanup){
                    o.cleanup.status = data.steps.cleanup.status;
                    $log.debug('updated cleanup to %o', data.steps.cleanup.status);
                } else if(data.steps.image_execute){
                    o.image_execute.status = data.steps.image_execute.status;
                    $log.debug('updated image_execute to %o', data.steps.image_execute.status);
                } else if(data.steps.image_build){
                    if(data.steps.image_build.status){
                        o.image_build.status = data.steps.image_build.status;
                        $log.debug('updated image_build to %o', data.steps.image_build.status);
                    }
                } else if(data.steps.validate_bag){
                    o.validate_bag.status = data.steps.validate_bag.status;
                    $log.debug('updated validate_bag to %o', data.steps.validate_bag.status);
                } else if(data.steps.validate_compendium){
                    o.validate_compendium.status = data.steps.validate_compendium.status;
                    $log.debug('updated validate_compendium to %o', data.steps.validate_compendium.status);
                } else if(data.steps.image_prepare){
                    o.image_prepare.status = data.steps.image_prepare.status;
                    $log.debug('updated image_prepare to %o', data.steps.image_prepare.status);
                }
                $log.debug('checkStatus with %o returning %s',o, jobs.checkStatus(o));
                scope.jobDone = jobs.checkStatus(o);
                return;
            }
        }
    }
})();