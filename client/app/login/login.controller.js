(function(){
    'use strict';

    angular
        .module('starter')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$log', '$location', 'login', 'icons', '$mdDialog'];

    function LoginController($scope, $log, $location, login, icons, $mdDialog){
        var vm = this;

        vm.icons = icons;
        vm.user = {};
        vm.isLoggedIn;
        //vm.submitSearch = search;
        vm.showSearchBar = showBar;
        vm.showHelp = showHelp;

        activate();


        $scope.$on('setUser', function(){
            vm.user = login.getUser();
            vm.loggedIn = login.isLoggedIn();
        });

        ///////////

        function activate(){
            login.getUserCall();
        }

        /*function search(){
            if (angular.isDefined(vm.searchInput) && vm.searchInput.trim() != ""){
                $location.path('/search').search('q=' + vm.searchInput);
                vm.searchInput = null;
            }
        }*/

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

        function showHelp(ev){
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .ariaLabel('Help')
                    .title('Help')
                    .htmlContent(
                        'For more information, see <br>' + 
                        '<a href="https://o2r.info/results/" target="_blank">o2r results</a> <br>' + 
                        '<a href="https://o2r.info/erc-spec/spec/" target="_blank">ERC specification</a> <br>' +
                        '<a href="http://www.dlib.org/dlib/january17/nuest/01nuest.html" target="_blank">Opening the publication cycle with ERC</a>'
                    )
                    .targetEvent(ev)
                    .ok('Close')
            );
        }

    }
})();
