(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ReproduceController', ReproduceController);
    
    ReproduceController.$inject = ['$scope', '$log', 'compFJob', 'compSJob', 'erc', 'jobs'];
    function ReproduceController($scope, $log, compFJob, compSJob, erc, jobs){
        var reproduce = erc;
        var vm = this;
        vm.fJob = compFJob.data;
        vm.sJob = compSJob.data;
        vm.ercId = reproduce.id;

        jobs.setLastFinishedJobId(vm.fJob.id);
    }
})();