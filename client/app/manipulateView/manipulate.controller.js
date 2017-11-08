(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ManipulateController', ManipulateController);
    
    ManipulateController.$inject = ['$scope', '$log', 'erc'];
    function ManipulateController($scope, $log, erc){
        var manipulate = erc;
        
        var vm = this;
        vm.selectedTab = 0;

        vm.activateCodeData = () => $scope.$parent.vm.activateMCodeData();
        $log.debug(manipulate);

        $scope.$on('$destroy', function(){
            $scope.$parent.vm.resetMCodeData();
        });

        $scope.$watch('vm.selectedTab', function(newVal, oldVal){
            $log.debug('Tab changed to object: %s', newVal);

            var newObj = {};
            newObj.code = [manipulate.metadata.o2r.interaction.ui_binding[newVal].underlyingCode];
            newObj.data = [manipulate.metadata.o2r.interaction.ui_binding[newVal].underlyingData];

            $scope.$parent.vm.mSetCodeData(newObj);
        });

        vm.figures = manipulate.metadata.o2r.interaction.ui_binding;

        /////////////////

    }
})()