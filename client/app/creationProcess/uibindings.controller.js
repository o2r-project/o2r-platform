(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UIBindingsController', UIBindingsController);
    
    UIBindingsController.$inject = ['$scope', '$log', 'creationObject'];

    function UIBindingsController($scope, $log, creationObject){
        var logger = $log.getInstance('UiBindings');

        var vm = this;
        vm.bindings = creationObject.getUibindings();

        vm.purposes = ["change variable", "change visualization", "exchange dataset"];
        vm.widgets = [];
        vm.inferWidget = inferWidget;

        $scope.$on('$destroy', function(){
            logger.info(angular.toJson(creationObject.getUibindings()));
        });

        ////////
        
        function inferWidget(){
            
        }
    }

})();


           
           
            
           
           
            