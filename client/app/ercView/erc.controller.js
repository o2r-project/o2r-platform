(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcCtrl', ErcCtrl);

    ErcCtrl.$inject = ['$scope', '$stateParams','$log', '$mdDialog', 'publications', 'ercView', 'compInfo', 'env', 'header', 'socket'];

    function ErcCtrl($scope, $stateParams, $log, $mdDialog, publications, ercView, compInfo, env, header, socket){
        var vm = this;
        var originatorEv;
        
        vm.ercId = $stateParams.ercid; // id of compendium
        vm.publication = compInfo;
        vm.oneFile; // one file in publication
        vm.setOne = setOne;
        vm.execJob = ex;
        vm.execStatus = ercView.getExecStatus();
        vm.jobDone = true;
        vm.server = env.server;
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };
        vm.openMenu = function($mdOpenMenu, ev){
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        vm.steps = {};
        vm.gotSocket = false;
        vm.isEmpty = isEmpty;

        $log.debug('ErcCtrl, publication: %o', vm.publication);
        
        $scope.$on('changedExecStatus', function(){
            vm.execStatus = ercView.getExecStatus();
        });
        $scope.$on('changedJobDone', function(){
            vm.jobDone = ercView.getJobDone();
        });

        activate();
        ///////////////
        
        function activate(){
            // publications.getRequest(vm.ercId); // httpRequest for retrieving all metadata of a compendium
            // ercView.callJobs(vm.ercId); // getting job status
            header.setTitle('o2r - Compendium');
            
            $log.debug(vm.execStatus);

            socket.on('document', function(data){
                vm.gotSocket = true;
                stepUpdater(data, vm.steps);
            });

            socket.on('set', function(data){
                vm.gotSocket = true;
                stepUpdater(data, vm.steps);
            });
        }

        function stepUpdater(data, o){
                if(data.steps.cleanup){
                    o.cleanup = data.steps.cleanup.status;
                    $log.debug('updated cleanup');
                } else if(data.steps.image_execute){
                    o.image_execute = data.steps.image_execute.status;
                    $log.debug('updated image_execute');
                } else if(data.steps.image_build){
                    if(data.steps.image_build.status){
                        o.image_build = data.steps.image_build.status;
                        $log.debug('updated image_build');
                    }
                } else if(data.steps.validate_bag){
                    o.validate_bag = data.steps.validate_bag.status;
                    $log.debug('updated validate_bag');
                } else if(data.steps.validate_compendium){
                    o.validate_compendium = data.steps.validate_compendium.status;
                    $log.debug('updated validate_compendium');
                } else if(data.steps.image_prepare){
                    o.image_prepare = data.steps.image_prepare.status;
                    $log.debug('updated image_prepare');
                }
            return;
        }

        function setOne(path){
            var p = publications.getContentById(vm.publication, path);
            $log.debug('clicked on file: ', p);
            var isEmpty = true;
            for(var att in p){
                isEmpty = false;
            }
            if (isEmpty){
                $log.debug('clicked on folder');
                return;
            }
            vm.oneFile = p;
        }

        function ex(){
            ercView.executeJob(vm.ercId);
        }

        function isEmpty(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)) return false;
            }
            return true;
        }
    }
})();

