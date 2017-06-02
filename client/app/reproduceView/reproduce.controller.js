(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ReproduceController', ReproduceController);
    
    ReproduceController.$inject = ['$scope', '$log', 'compFJob', 'compSJob', 'examine'];
    function ReproduceController($scope, $log, compFJob, compSJob, examine){
        var reproduce = examine;
        var vm = this;
        vm.fJob = compFJob.data;
        vm.sJob = compSJob.data;
        vm.ercId = reproduce.id;
    }
})();