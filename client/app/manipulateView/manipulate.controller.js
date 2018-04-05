(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ManipulateController', ManipulateController);
    
    ManipulateController.$inject = ['$scope', '$log', 'erc', 'httpRequests'];
    function ManipulateController($scope, $log, erc, httpRequests){
        var manipulate = erc.metadata.o2r.interaction;
        var vm = this;
        vm.selectedTab = 0;
        vm.threshold = null;
        vm.query = "";

        vm.manipulations = [];
        manipulate.forEach(element => {
            if (element.task === 'manipulate'){
                vm.manipulations.push(element);
            }
        });

        vm.activateCodeData = () => $scope.$parent.vm.activateMCodeData();
        $log.debug(manipulate);

        $scope.$on('$destroy', function(){
            $scope.$parent.vm.resetMCodeData();
        });

        $scope.$watch('vm.selectedTab', function(newValue, oldVal){
            buildManipulationView(newValue);
            $log.debug('Tab changed to object: %s', newValue);
            httpRequests.runManipulationService(vm.manipulations[newValue]).then(function(data){
                console.log(data)
            });
            vm.query = 'http://localhost:8000/' + vm.manipulations[newValue].figure.replace(/\s/g, '').toLowerCase() + '?newValue=' + vm.manipulations[newValue].widget.init;
            $scope.$watch('vm.threshold', function(newVal, oldVal){
                if (newVal !=null){
                    console.log(newVal)
                    vm.query = 'http://localhost:8000/' + vm.manipulations[newValue].figure.replace(/\s/g, '').toLowerCase() + '?newValue=' + newVal;
                }
                console.log(newVal)
            });
        });

        function buildManipulationView(item){
            var newObj = {};
                newObj.code = [vm.manipulations[item].codesnippet];
                newObj.data = [manipulate[item].underlyingData];
                vm.threshold = manipulate[item].widget.init;
            $scope.$parent.vm.mSetCodeData(newObj);
        }

        /////////////////

    }
})()