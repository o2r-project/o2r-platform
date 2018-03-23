(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UIBindingsController', UIBindingsController);
    
    UIBindingsController.$inject = ['$scope', '$log', 'creationObject'];

    function UIBindingsController($scope, $log, creationObject){
        var logger = $log.getInstance('UiBindings');
        var vm = this;
            vm.erc = creationObject.get();
    }
})();