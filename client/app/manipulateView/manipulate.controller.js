(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ManipulateController', ManipulateController);
    
    ManipulateController.$inject = ['$scope', '$log', 'examine'];
    function ManipulateController($scope, $log, examine){
        var manipulate = examine;
        
        var vm = this;
        vm.interactive = {};
        vm.interactive.path = manipulate.metadata.o2r.shiny_app;
        vm.interactive.type = 'text/shiny';
        vm.interactive.name = 'mjomeiAnalysis2';
        $log.debug(manipulate);
    }
})()