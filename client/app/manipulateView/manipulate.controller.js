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
            if (element.purpose === 'manipulateFigure'){
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
            vm.query = 'http://localhost:' + vm.manipulations[newValue].port + '/' + vm.manipulations[newValue].result.value.replace(/\s/g, '').toLowerCase() + '?newValue=' + vm.manipulations[newValue].code.parameter.val;
            $scope.$watch('vm.threshold', function(newVal, oldVal){
                if (newVal !=null){
                    vm.query = 'http://localhost:' + vm.manipulations[newValue].port + '/' + vm.manipulations[newValue].result.value.replace(/\s/g, '').toLowerCase() + '?newValue=' + newVal;
                }
            });
        });

        function buildManipulationView(item){
            vm.radio, vm.slider = false;
            var binding = vm.manipulations[item];
            var newObj = {};
                newObj.code = [binding.codesnippet];
            vm.threshold = binding.code.parameter.val;
                if (binding.datafile){
                    newObj.data = [binding.datafile];
                }else{
                    newObj.data = erc.metadata.o2r.inputfiles;
                }
                if (binding.code.parameter.widget.type == 'radio'){
                    vm.radio=true;
                } else if(binding.code.parameter.widget.type == 'slider'){
                    vm.slider=true
                }
            $scope.$parent.vm.mSetCodeData(newObj);
        }

        /////////////////

    }
})()