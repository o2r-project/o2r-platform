(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$scope', '$state', '$window', '$location', '$stateParams', 'header', '$mdToast', '$document', 
                                    '$mdDialog', 'login', 'httpRequests', 'ngProgressFactory', 'icons', 'ngIntroService', '$cookies'];

    function HomeController($log, $scope, $state, $window, $location, $stateParams, header, $mdToast, $document, 
                                    $mdDialog, login, httpRequests, ngProgressFactory, icons, ngIntroService, $cookies){
        var logger = $log.getInstance('HomeCtrl');
        var inspectQuery = $stateParams.inspect || '';
        var cookie = 'introduction_was_seen';
        var vm = this;
        vm.icons = icons;
        vm.publicLink = 'https://uni-muenster.sciebo.de/s/hAh8AZLYvHNgNA9';
        vm.useExample = useExample;
        vm.submit = submitter;
        vm.openDialog = openDialog;
        vm.openMenu = openMenu;
        vm.user = {};
        vm.isLoggedIn;
        vm.sendScieboUrl = sendScieboUrl;
        vm.validUrl = true;
        vm.ercID = inspectQuery;
        vm.autostart = false;
        vm.introOptions = {
            steps: [
            {
                element: '#o2r-login',
                intro: 'Login with your ORCID identifier <a href="https://orcid.org"><img src="https://members.orcid.org/sites/default/files/vector_iD_icon.svg" alt="ORCID iD icon" height="12" /></a>, for uploading ERCs, etc...'
            },
            {
                element: '#home-create-erc',
                intro: 'You can upload ERC from your PC or directly from the cloud.'
            },
            {
                element: '#home-create-examples',
                intro: 'Check out our example ERCs, to see how it works.'
            },
            {
                element: '#home-inspect-erc',
                intro: 'Type in the ID of an existing ERC to directly see its content.'
            },
            {
                element: '#home-inspect-examples',
                intro: 'Check out our example ERCs, to see how it works.'
            },
            {
                element: '#o2r-erc-info',
                intro: 'More information about ERC can be found here.'
            }
            ],
            tooltipPosition: 'auto',
            hideNext: false,
            showProgress: true,
            scrollToElement: true,
            showBullets: false
        };

        activate();

        $scope.$on('setUser', function(){
            vm.user = login.getUser();
            vm.loggedIn = login.isLoggedIn();
            $log.debug(vm.user);
        });

        $scope.$on('$destroy', function(){
            $mdDialog.cancel();
            vm.scieboUrl = '';
            vm.scieboPath = '';
        });
        ///////////

        function activate(){
            if($window.location.href.indexOf('shareURL') >= 0){
                parseURL($window.location.href);
            }

            header.setTitle('o2r - opening reproducible research');
            login.getUserCall();

            try {
                var cookiecontent = $cookies.getObject(cookie);
                if(cookiecontent != 'yes'){
                    startIntro();
                }
            } catch (error) {
                logger.info('Introduction has been seen already.');
            }
        }
        
        //Working example: http://localhost/#!/home?shareURL=https://uni-muenster.sciebo.de/index.php/s/m7k16mNmfDbSO0P&path=/metatainer
        function parseURL(url){
            url = url.split('%2F').join('/');
            vm.scieboUrl = url.split('shareURL=')[1].split('&')[0];
            vm.scieboPath = url.split('path=/')[1];
        }

        function sendScieboUrl(url, path, analysis){
            var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('10px');
			progressbar.start();

            var id;
            httpRequests
                .uploadViaSciebo(url, path)
                .then(scieboCallback)
                .catch(errorHandler);

            function scieboCallback(response){
                id = response.data.id;
                if(analysis){
                    httpRequests
                        .newJob({compendium_id: id})
                        .then(goToCreation)
                        .catch(errorHandler);
                } else {
                    goToCreation();
                }
            }

            function goToCreation(){
                progressbar.complete();
                $location.path('/creationProcess/' + id);
            }

            function errorHandler(err){
                $log.debug(err);
                progressbar.complete();
                showToast(err);
            }

            function showToast(error){
                var text = error;
                var toastClass = 'creationProcess-failure-toast';
                $mdToast.show(
                    $mdToast
                        .simple()
                        .textContent(text)
                        .action('Close')
                        .position('top right')
                        .toastClass(toastClass)
                        .hideDelay(false)
                        .parent($document[0].body.children.main.children["ui-view"])
                );
            }
        }

        function submitter(id){
            $state.go('erc', {ercid: id});
        };

        function openDialog(ev){
            $mdDialog.show({
                controller: 'UploadModalController',
                controllerAs: 'vm',
                templateUrl: 'app/upload/uploadModal.html',
                parent: $document[0].body,
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: false
            });
        }

        function openMenu($mdMenu, ev){
            $mdMenu.open(ev);
        }

        function useExample(publicLink, folder){
            vm.scieboPath = folder;
            vm.scieboUrl = publicLink;
        }

        function startIntro(){
            $cookies.put(cookie, 'yes');
            vm.autostart = true;
        }
    }
})();