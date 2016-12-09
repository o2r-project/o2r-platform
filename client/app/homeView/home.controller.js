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
        
        function tester(){
            console.log("test")
        }

        function activate(){
            header.setTitle('o2r - opening reproducible research');
        }

        function submitter(){
            if (vm.searchModel!=undefined && vm.searchModel.trim() != ""){
                var _query = vm.searchModel.replace(/ /g, "+");
                $location.path('/search').search('q=' + _query);
            }
        };
    }
})();