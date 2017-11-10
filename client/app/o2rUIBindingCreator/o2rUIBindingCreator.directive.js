(function(){
    'use strict';

    angular
        .module('starter.o2rUibindingscreator')
        .directive('o2rUiBindingsCreator', o2rUiBindingsCreator);
    
    o2rUiBindingsCreator.$inject = ["$log"];
    function o2rUiBindingscreator($log){
        return{
            restrict: 'E',
            scope: {
            },
            templateUrl: 'app/o2rUIBindingsCreator/o2rUIBindingsCreator.template.html',
            link: link
        };

        function link(scope){
            
        }
    }
})();