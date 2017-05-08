(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ExamineController', ExamineController);

    ExamineController.$inject = ['$scope', '$stateParams', '$log', '$state', 'examine', 'publications'];
    function ExamineController($scope, $stateParams, $log, $state, examine, publications){
        var defView = {};
        defView.state = 'examine.inspect';
        defView.name = 'inspect';
        
        var vm = this;
        vm.publication = examine;
        vm.file = publications.getContentById(vm.publication, fixPath(vm.publication.metadata.o2r.file.filepath));
        vm.currentNavItem = defView.name;

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
    }
}
)();