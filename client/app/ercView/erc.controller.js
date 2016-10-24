(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcCtrl', ErcCtrl);

    ErcCtrl.$inject = ['$scope', '$stateParams','$log', '$mdDialog', 'publications', 'ercView', 'compInfo', 'env', 'header'];

    function ErcCtrl($scope, $stateParams, $log, $mdDialog, publications, ercView, compInfo, env, header){
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
    }
})();

