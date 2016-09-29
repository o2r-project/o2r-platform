(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$location'];

    function HomeCtrl($scope, $location){
        var vm = this;
        vm.submit = submitter;
        
        ///////////
        
        function submitter(){
            var _query = vm.searchModel.replace(/ /g, "+");
            $location.path('/search').search('term=asdf'); // $location.path('/search').search('term=' + _query);
        };
    }
})();