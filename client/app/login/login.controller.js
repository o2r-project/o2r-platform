(function(){
    'use strict';

    angular
        .module('starter')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'login'];

    function LoginCtrl($scope, login){
        var vm = this;

        vm.user = {};
        vm.isLoggedIn;

        activate();
        
        $scope.$on('setUser', function(){
            vm.user = login.getUser();
            vm.loggedIn = login.isLoggedIn();
        });

        ///////////

        function activate(){
            login.getUserCall();
        }
    }
})();