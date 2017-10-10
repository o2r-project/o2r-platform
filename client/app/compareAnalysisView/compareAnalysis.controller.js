(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareAnalysisController', CompareAnalysisController);
    
    CompareAnalysisController.$inject = ['$scope', '$stateParams', '$log', '$mdDialog', 'icons'];
    function CompareAnalysisController($scope, $stateParams, $log, $mdDialog, icons){
        var logger = $log.getInstance('compareAnalysis');
        var vm = this;
        vm.icons = icons;
        vm.original = {};
        vm.original.path = $stateParams.o || 'http://localhost/api/v1/compendium/' + $stateParams.ercid + '/data/data/Original.html';
        vm.original.type = $stateParams.om || 'text/html';
        vm.reproduced = {};
        vm.reproduced.path = $stateParams.r || 'http://localhost/api/v1/compendium/' + $stateParams.ercid + '/data/data/Reproduced.html';
        vm.reproduced.type = $stateParams.rm || 'text/html';
        vm.difference = {};
        vm.difference.path = $stateParams.d || 'http://localhost/api/v1/compendium/' + $stateParams.ercid + '/data/data/Checker_Result.html';
        vm.difference.type = $stateParams.dm || 'text/html';
        vm.cancel = cancel;
        logger.info('compareAnalysisView with params:', $stateParams);

        /////

        function cancel(){
            $mdDialog.cancel();
        }
    }
})()