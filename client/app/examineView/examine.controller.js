(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ExamineController', ExamineController);

    ExamineController.$inject = ['$scope', '$stateParams', '$log', '$state', 'examine', 'publications', 'icons', '$mdSidenav', 'env'];
    function ExamineController($scope, $stateParams, $log, $state, examine, publications, icons, $mdSidenav, env){
        var defView = {};
        defView.state = 'examine.reproduce';
        defView.name = 'reproduce';
        
        var vm = this;
        vm.icons = icons;
        vm.server = env.server;
        vm.publication = examine;
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

        $log.debug(vm.publication);
        $log.debug(vm.file);

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
    }
}
)();