(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UIBindings', UIBindings);
    
    UIBindings.$inject = ['$scope', '$rootScope', '$stateParams', 'httpRequests', '$log'];

    function UIBindings($scope, $rootScope, $stateParams, httpRequests, $log){
        var vm = this;
        vm.purposes = ["change variable", "change visualization", "exchange dataset"];
        vm.widgets = [];
        vm.inferWidget = inferWidget;

        function inferWidget(){
            
        }
    }

})();


           
           
            
           
           
            