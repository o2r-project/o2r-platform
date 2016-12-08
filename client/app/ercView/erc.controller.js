(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcCtrl', ErcCtrl);

    ErcCtrl.$inject = ['$scope', '$stateParams','$log', '$mdDialog', 'publications', 'jobs', 'compInfo', 'compFJob', 'compSJob', 'env', 'icons', 'header', 'socket'];

    function ErcCtrl($scope, $stateParams, $log, $mdDialog, publications, jobs, compInfo, compFJob, compSJob, env, icons, header, socket){
        var vm = this;
        var originatorEv;
        vm.fJob = compFJob.data;
        vm.sJob = compSJob.data;
        vm.icons = icons;
        vm.ercId = $stateParams.ercid; // id of compendium
        vm.publication = compInfo;
        vm.oneFile; // one file in publication
        vm.setOne = setOne;
        vm.server = env.server;
        vm.isEmpty = isEmpty;
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };
        vm.openMenu = function($mdOpenMenu, ev){
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $log.debug('ErcCtrl, publication: %o', vm.publication);

        activate();
        ///////////////
        
        function activate(){
            // publications.getRequest(vm.ercId); // httpRequest for retrieving all metadata of a compendium
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

        function isEmpty(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)) return false;
            }
            return true;
        }
    }
})();

