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
            vm.manipulations.push(element);
        });

        vm.activateCodeData = () => $scope.$parent.vm.activateMCodeData();
        $log.debug(manipulate);

        $scope.$on('$destroy', function(){
            $scope.$parent.vm.resetMCodeData();
        });

        $scope.$watch('vm.selectedTab', function(newValue, oldVal){
            buildManipulationView(newValue);
            $log.debug('Tab changed to object: %s', newValue);

            vm.query = createUrl(vm.manipulations[newValue].port, vm.manipulations[newValue].result.value, vm.manipulations[newValue].code.parameter.val);
            $scope.$watch('vm.threshold', function(newVal, oldVal){
                if (newVal !=null){
                    vm.query = createUrl(vm.manipulations[newValue].port, vm.manipulations[newValue].result.value, newVal);
                    console.log("query sent " + vm.query)
                }
            });
        });

        function createUrl(port, result, value){
            if (typeof value == 'string'){
                //value = value.substring(1, value.length-1);
            } 
            return 'http://localhost:' + port + '/' + result.replace(/\s/g, '').toLowerCase() + '?newValue=' + value;
        }

        $scope.$on('broadcastSelection', function(e, d){
            console.log(e);
            console.log(d);
        })

        function buildManipulationView(item){
            vm.radio, vm.slider = false;
            var binding = vm.manipulations[item];
            var newObj = {};
                newObj.code = [binding.codesnippet];  

                if (binding.datafile){
                    newObj.data = [binding.datafile];
                }else{
                    newObj.data = erc.metadata.o2r.inputfiles;
                }
                if (binding.code.parameter.widget.type == 'radio'){
                    if (typeof binding.code.parameter.val == 'number'){
                        vm.threshold = binding.code.parameter.val    
                    }
                    if (typeof binding.code.parameter.val == 'string'){
                        vm.threshold = binding.code.parameter.val.substring(1, binding.code.parameter.val.length-1);
                    }
                    vm.radio=true;
                } else if(binding.code.parameter.widget.type == 'slider'){
                    vm.threshold = binding.code.parameter.val;
                    vm.slider=true
                }
            $scope.$parent.vm.mSetCodeData(newObj);
        }
    }
})()