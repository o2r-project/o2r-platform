(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SubstituteController', SubstituteController);
    
    SubstituteController.$inject = ['$scope', '$log'];
    function SubstituteController($scope, $log){
        var vm = this;
    }
})()