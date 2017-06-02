(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ReproduceController', ReproduceController);
    
    ReproduceController.$inject = ['$scope', '$log', 'compFJob', 'compSJob', '$stateParams'];
    function ReproduceController($scope, $log, compFJob, compSJob, $stateParams){
        var vm = this;
        vm.fJob = compFJob.data;
        vm.sJob = compSJob.data;
        vm.isEmpty = isEmpty;
        vm.ercId = $stateParams.ercid;

        ///////

        function isEmpty(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)) return false;
            }
            return true;
        }
    }
})();