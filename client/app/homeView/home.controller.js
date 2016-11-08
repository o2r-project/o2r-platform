(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$location', 'header'];

    function HomeCtrl($scope, $location, header){
        var vm = this;
        vm.submit = submitter;
        
        activate();
        ///////////
        
        function activate(){
            header.setTitle('o2r - opening reproducible research');
        }

        function submitter(){
            var _query = vm.searchModel.replace(/ /g, "+");
            $location.path('/search').search('term=asdf'); // $location.path('/search').search('term=' + _query);
        };
    }
})();