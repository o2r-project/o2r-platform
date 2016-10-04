(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcCtrl', ErcCtrl);

    ErcCtrl.$inject = ['$scope', '$stateParams','$log', '$mdDialog', 'publications', 'ercView', 'env', 'compInfo'];

    function ErcCtrl($scope, $stateParams, $log, $mdDialog, publications, ercView, env, compInfo){
        var vm = this;
        var ercId = $stateParams.ercid; // id of compendium
        var originatorEv;
        
        vm.publication = compInfo;
        vm.getOne = function(path){
            var p = publications.getContentById(vm.publication, path);
            return p;
        }
        vm.displaySource = (str) => ercView.checkDisplayType(str);
        vm.sizeRestrict = env.sizeRestriction;
        vm.fileId; // id of file in publication
        vm.setId = setId;
        vm.execJob = ex;
        vm.execStatus = ercView.getExecStatus();
        vm.jobDone = true;
        vm.openMenu = function($mdOpenMenu, ev){
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };

        $log.debug('ErcCtrl, publication: %o', vm.publication);
        
        $scope.$on('changedExecStatus', function(){
            vm.execStatus = ercView.getExecStatus();
        });
        $scope.$on('changedJobDone', function(){
            vm.jobDone = ercView.getJobDone();
        });

        ///////////////
        
        function activate(){
            publications.getRequest(ercId); // httpRequest for retrieving all metadata of a compendium
            ercView.callJobs(ercId); // getting job status
        }
        
        function setId(path){  // set fileId
            vm.fileId = path;
        }

        function ex(){
            ercView.executeJob(ercId);
        }
    }
})();

