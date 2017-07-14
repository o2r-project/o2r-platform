(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcController', ErcController);

    ErcController.$inject = ['$scope', '$stateParams', '$log', '$state', 'erc', 'publications', 'icons', '$mdSidenav', 'env'];
    function ErcController($scope, $stateParams, $log, $state, erc, publications, icons, $mdSidenav, env){
        var defView = {};
        defView.state = 'erc.reproduce';
        defView.name = 'reproduce';
        
        var vm = this;
        vm.icons = icons;
        vm.server = env.server;
        vm.publication = erc;
        vm.file = publications.getContentById(vm.publication, fixPath(vm.publication.metadata.o2r.file.filepath));
        vm.originalfile = angular.copy(vm.file);
        vm.currentNavItem = defView.name;
        vm.toggleSidenav = buildToggler('sidenav');
        vm.originalSelected = true;
        vm.checkForOriginal = checkForOriginal;
        vm.showOriginal = showOriginal;
        vm.openMenu = function($mdOpenMenu, ev){
            $mdOpenMenu(ev);
        };
        vm.mShowCodeData = false;
        vm.mSetCodeData = mSetCodeData;
        vm.activateMCodeData = () => vm.mShowCodeData = true;
        vm.resetMCodeData = () => vm.mShowCodeData = false;
        vm.mCodeData = {};

        vm.inspect = {};
        vm.inspect.data = vm.publication.metadata.o2r.inputfiles;
        /* TODO
        Replace this code with the right path to code files as soon as metadata contains this information
        */
        vm.inspect.code = [];
        vm.inspect.code.push({
            path: vm.publication.metadata.o2r.file.filepath,
            type: vm.publication.metadata.o2r.file.mimetype,
            name: vm.publication.metadata.o2r.file.filename
        });



        $log.debug(vm.publication);

        activate();

        /////

        function activate(){
           $state.go(defView.state);
        }

        function fixPath(path){
            var str = '/data/';
            path = '/api/v1/compendium/' + path;
            var newPath = path.replace(str, str+'data/');
            $log.debug('fixed path is: %s', newPath);
            return newPath;
        }

        function buildToggler(navId){
            return function(){
                $mdSidenav(navId)
                    .toggle();
            };
        }

        function checkForOriginal(){
            vm.originalSelected = angular.equals(vm.file, vm.originalfile);
        }

        function showOriginal(){
            vm.file = angular.copy(vm.originalfile);
            checkForOriginal();
        }

        /**
         * 
         * @param {Object} obj, expects an object with two attributes: code, data. Each attribute is an array 
         */
        function mSetCodeData(obj){
            vm.mCodeData = obj;
            vm.mCodeData.publication = vm.publication;
        }
    }
}
)();