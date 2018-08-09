(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UIBindingsController', UIBindingsController);
    
    UIBindingsController.$inject = ['$log', 'creationObject'];

    function UIBindingsController($log, creationObject){
        var logger = $log.getInstance('UiBindings');
        var vm = this;
            vm.erc = creationObject.get();
    }
})();