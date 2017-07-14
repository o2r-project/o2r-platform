(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareAnalysisController', CompareAnalysisController);
    
    CompareAnalysisController.$inject = ['$scope', '$stateParams', '$log', '$mdDialog', 'icons'];
    function CompareAnalysisController($scope, $stateParams, $log, $mdDialog, icons){
        var vm = this;
        vm.icons = icons;
        vm.original = {};
        vm.original.path = $stateParams.o || 'http://localhost/api/v1/compendium/IjQaH/data/data/Original.html';
        vm.original.type = $stateParams.om || 'text/html';
        vm.reproduced = {};
        vm.reproduced.path = $stateParams.r || 'http://localhost/api/v1/compendium/IjQaH/data/data/Reproduced.html';
        vm.reproduced.type = $stateParams.rm || 'text/html';
        vm.difference = {};
        vm.difference.path = $stateParams.d || 'http://localhost/api/v1/compendium/IjQaH/data/data/Checker_Result.html';
        vm.difference.type = $stateParams.dm || 'text/html';
        vm.cancel = cancel;
        $log.debug('compareAnalysisView with params: %o', $stateParams);

        /////

        function cancel(){
            $mdDialog.cancel();
        }
    }
})()