(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UIBindingsController', UIBindingsController);
    
    UIBindingsController.$inject = ['$scope', '$log', 'creationObject', 'icons'];

    function UIBindingsController($scope, $log, creationObject, icons){
        var logger = $log.getInstance('UiBindings');

        var vm = this;
        vm.icons = icons;
        vm.bindings = creationObject.getUibindings();
        //console.log(vm.binding.ui_binding.length);
        vm.input = creationObject.getInputFiles();

        vm.updateBinding = updateBinding;
        vm.removeBinding = removeBinding;
        vm.addBinding = creationObject.addBinding;
        vm.addNewBinding = addNewBinding;
        vm.newBinding = newBinding;
        
        vm.newBindingEdit = false;
        vm.hideAddBindingButton = false;
        vm.cancelNewBinding = cancelNewBinding;
        vm.cancelUpdateBinding = cancelUpdateBinding;

        $scope.$on('$destroy', function(){
            logger.info(angular.toJson(creationObject.getUibindings()));
        });

        $scope.$watch('vm.underlyingData', function(newVal, oldVal){
            try {
                vm.updateUibinding('underlyingData', vm.input.r_rdata[newVal]);
            } catch (e) {}
        });

        $scope.$watch('vm.binding.underlyingCode', function(newVal, oldVal){
            try {
                vm.updateUibinding('underlyingCode', vm.input.viewfiles[newVal]);
                //console.log(vm.binding.underlyingCode)
            } catch (e) {}
        });        

        function removeBinding(index){
            vm.bindings.splice(index, 1);
            creationObject.removeBinding(index);
        }

        function addNewBinding(){
            var binding = {};
                binding.shinyURL = {};
                binding.shinyURL.path = vm.binding.shinyURL;
                binding.shinyURL.type = 'text/shiny';
                binding.underlyingData = vm.input.r_rdata[vm.binding.underlyingData] || "";
                binding.underlyingCode = vm.input.viewfiles[vm.binding.underlyingCode] || "";
            vm.bindings.push(binding);
            vm.addBinding(binding);
            //reset values
            vm.cancelNewBinding();           
        }

        function newBinding(){
            vm.newBindingEdit = true;
            vm.hideAddBindingButton = true;
        }

        function cancelNewBinding(){
            vm.newBindingEdit = false;
            vm.hideAddBindingButton = false;
            if(vm.binding){
                vm.binding.shinyURL = null;
                vm.binding.underlyingData = null;
                vm.binding.underlyingCode = null;
            }
        }

        function updateBinding(index){
            var binding = {};
                binding.shinyURL = vm.binding.shinyURL || vm.bindings[index].shinyURL;
                binding.underlyingData = vm.input.r_rdata[vm.binding.underlyingData] || vm.bindings[index].underlyingData;
                binding.underlyingCode = vm.input.viewfiles[vm.binding.underlyingCode] || vm.bindings[index].underlyingCode;
            vm.bindings[index].shinyURL = binding.shinyURL;
            vm.bindings[index].underlyingData = binding.underlyingData;
            vm.bindings[index].underlyingCode = binding.underlyingCode;
            creationObject.updateBinding(index, binding.shinyURL, binding.underlyingData, binding.underlyingCode);
            vm.cancelUpdateBinding();
        }        

        function cancelUpdateBinding(){
            vm.editBinding = null;
            if(vm.binding){
                vm.binding.shinyURL = null;
                vm.binding.underlyingData = null;
                vm.binding.underlyingCode = null;
            }
        }

        ////////
    }

})();