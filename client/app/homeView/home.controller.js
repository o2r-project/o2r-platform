(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$scope', '$location', 'header'];

    function HomeController($log, $scope, $location, header){
        var vm = this;
        vm.submit = submitter;
        
        activate();
        
        ///////////

        function activate(){
            header.setTitle('o2r - opening reproducible research');
        }

        function submitter(){
            if (angular.isDefined(vm.searchModel) && vm.searchModel.trim() != ""){
                var _query = vm.searchModel.replace(/ /g, "+");
                $location.path('/search').search('q=' + _query);
            }
        };
    }
})();