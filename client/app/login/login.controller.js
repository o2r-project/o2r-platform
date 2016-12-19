(function(){
    'use strict';

    angular
        .module('starter')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$log', '$location', 'login', 'icons'];

    function LoginCtrl($scope, $log, $location, login, icons){
        var vm = this;

        vm.icons = icons;
        vm.user = {};
        vm.isLoggedIn;
        vm.submitSearch = search;
        vm.showSearchBar = showBar;

        activate();
        

        $scope.$on('setUser', function(){
            vm.user = login.getUser();
            vm.loggedIn = login.isLoggedIn();
        });

        ///////////

        function activate(){
            login.getUserCall();
        }

        function search(){
            if (vm.searchInput!=undefined && vm.searchInput.trim() != ""){ 
                $location.path('/search').search('q=' + vm.searchInput);
                vm.searchInput = null;
            }
        }

        function showBar(){
            var showIt = true;
            var state = $location.path();
            state = state.split('/');
            var view = state[1];
            switch(view){
                case 'search':
                    showIt = false;
                    break;
                case 'home':
                    showIt = false;
                    break;
                default:
                    showIt = true;
                    break;
            }
            return showIt;
        }
    }
})();