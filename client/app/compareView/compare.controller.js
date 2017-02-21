(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareController', CompareController);

    CompareController.$inject = ['$scope'];
    function CompareController($scope){
        var vm = this;

        vm.toCompare = [{
            path:'/api/v1/compendium/dYCTU/data/data/main.Rmd',
            size:14709
        },{
            path:'/api/v1/compendium/dYCTU/data/data/main.Rmd',
            size:14709
        },{
            path: '/api/v1/compendium/dYCTU/data/data/shiny.html',
            size: 14709,
            type: 'text/html'
        }];
        
        
    }
})();