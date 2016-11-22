(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$log', '$scope', '$location', 'header'];

    function HomeCtrl($log, $scope, $location, header){
        var vm = this;
        vm.submit = submitter;
        
        activate();
        ///////////
        
        function activate(){
            header.setTitle('o2r - opening reproducible research');
        }

        function submitter(){
            var _query = vm.searchModel.replace(/ /g, "+");
            $location.path('/search').search('q=' + _query);
        };
    }
})();