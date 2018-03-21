(function(){
    'use strict';

    angular.module('test')
        .directive('test', test);
        console.log("test")
    function test(){
        return {
            template: 'app/test/test.directive.js'
        };
    };
});