(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$scope', '$location', 'header', '$document', '$mdDialog', 'login', 'httpRequests'];

    function HomeController($log, $scope, $location, header, $document, $mdDialog, login, httpRequests){
        var vm = this;
        vm.submit = submitter;
        vm.inspectERC = inspectERC;
        vm.openDialog = openDialog;
        vm.loggedIn = login.isLoggedIn();
        vm.sendScieboUrl = sendScieboUrl;
        
        activate();
        
        ///////////

        function sendScieboUrl(url){
            httpRequests.sendScieboUrl(url);
        }

        function activate(){
            header.setTitle('o2r - opening reproducible research');
        }

        function inspectERC(){
            console.log(vm.ercID)
        }

        function submitter(){
            if (angular.isDefined(vm.searchModel) && vm.searchModel.trim() != ""){
                var _query = vm.searchModel.replace(/ /g, "+");
                $location.path('/search').search('q=' + _query);
            }
        };

        function openDialog(ev){
            $mdDialog.show({
                controller: 'UploadModalController',
                controllerAs: 'vm',
                templateUrl: 'app/upload/uploadModal.html',
                parent: $document[0].body,
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
            });
        }
    }
})();