(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ReproduceController', ReproduceController);
    
    ReproduceController.$inject = ['$scope', '$log', 'compFJob', 'compSJob', 'erc'];
    function ReproduceController($scope, $log, compFJob, compSJob, erc){
        var reproduce = erc;
        var vm = this;
        vm.fJob = compFJob.data;
        vm.sJob = compSJob.data;
        vm.ercId = reproduce.id;
    }
})();