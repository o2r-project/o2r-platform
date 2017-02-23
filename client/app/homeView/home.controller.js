(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$scope', '$location', 'header', '$document', '$mdDialog', 'login', 'httpRequests', 'ngProgressFactory'];

    function HomeController($log, $scope, $location, header, $document, $mdDialog, login, httpRequests, ngProgressFactory){
        var vm = this;
        vm.submit = submitter;
        vm.openDialog = openDialog;
        vm.loggedIn = login.isLoggedIn();
        vm.sendScieboUrl = sendScieboUrl;
        vm.validUrl = true;
        
        activate();
        
        ///////////

        function sendScieboUrl(){
            var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('3px');
			progressbar.start();

            httpRequests.uploadViaSciebo(vm.scieboUrl, vm.scieboPath)
				.then(function (response) {
                    vm.validUrl=true;
					httpRequests.singleCompendium(response.data.id)
						.then(responseMetadata)
						.catch(errorHandlerMetadata);

					function responseMetadata(data){
						progressbar.complete();
						$location.path('/creationProcess/' + data.data.id + '/checkMetadata');
					}	

					function errorHandlerMetadata(err){
						$log.debug(err);
						progressbar.complete();
					}
				})
				.catch(function errorHandler(err){
					$log.debug(err);
					progressbar.complete();
                    vm.validUrl=false;
				});	
        }

        function activate(){
            header.setTitle('o2r - opening reproducible research');
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