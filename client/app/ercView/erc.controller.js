(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcController', ErcController);

    ErcController.$inject = ['$scope', '$stateParams','$log', '$mdDialog', 'publications', 'jobs', 'compInfo', 'compFJob', 'compSJob', 'env', 'icons', 'header', 'httpRequests', 'login'];

    function ErcController($scope, $stateParams, $log, $mdDialog, publications, jobs, compInfo, compFJob, compSJob, env, icons, header, socket, httpRequests, login){
        var vm = this;
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
            $mdOpenMenu(ev);
        };

        vm.sendToZenodo = sendToZenodo;
        vm.loggedIn = login.isLoggedIn();

        //To do:query to shipper api if ERC is already in zenodo
        vm.stillToArchive = stillToArchive;

        $log.debug('ErcCtrl, publication: %o', vm.publication);

        activate();
        ///////////////
        
        function activate(){
            // publications.getRequest(vm.ercId); // httpRequest for retrieving all metadata of a compendium
            header.setTitle('o2r - Compendium'); 
        }

        function stillToArchive(){
            httpRequests.ercInZenodo(vm.ercId);
            return true;
        }    

        function sendToZenodo(compendiumID){
            httpRequests.toZenodo(vm.ercId);
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

