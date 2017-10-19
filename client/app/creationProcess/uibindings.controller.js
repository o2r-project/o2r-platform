(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UIBindingsController', UIBindingsController);
    
    UIBindingsController.$inject = ['$scope', '$log', 'creationObject'];

    function UIBindingsController($scope, $log, creationObject){
        var logger = $log.getInstance('UiBindings');

        var vm = this;
        vm.binding = creationObject.getUibindings();
        vm.input = creationObject.getInputFiles();
        console.log(vm.input);
        vm.updateUibinding = creationObject.updateUibinding;
        $scope.$on('$destroy', function(){
            logger.info(angular.toJson(creationObject.getUibindings()));
        });

        $scope.$watch('vm.underlyingData', function(newVal, oldVal){
            try {
                vm.updateUibinding('underlyingData', vm.input.r_rdata[newVal]);
            } catch (e) {}
        });

        $scope.$watch('vm.underlyingCode', function(newVal, oldVal){
            try {
                vm.updateUibinding('underlyingCode', vm.input.viewfiles[newVal]);
            } catch (e) {}
        });        

        ////////
    }

})();