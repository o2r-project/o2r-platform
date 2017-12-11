(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcController', ErcController);

    ErcController.$inject = ['$scope', '$stateParams', '$log', '$state', '$window', 'erc', 'publications', 'icons', 'header', '$mdSidenav', 'env', 'ngProgressFactory', 'httpRequests', 'login'];
    function ErcController($scope, $stateParams, $log, $state, $window, erc, publications, icons, header, $mdSidenav, env, ngProgressFactory, httpRequests, login){
        var logger = $log.getInstance('ErcCtrl');
        var defView = {};
        defView.state = 'erc.reproduce';
        defView.name = 'reproduce';

        var vm = this;
        vm.icons = icons;
        vm.server = env.server;
        vm.publication = erc;
        vm.ercId = vm.publication.id;
        vm.file = publications.getContentById(vm.publication, fixPath(vm.publication.metadata.o2r.displayfile));
        vm.originalfile = angular.copy(vm.file);
        vm.currentNavItem = defView.name;
        vm.toggleSidenav = buildToggler('sidenav');
        vm.originalSelected = true;
        vm.checkForOriginal = checkForOriginal;
        vm.showOriginal = showOriginal;
        vm.openMenu = function($mdOpenMenu, ev){
            $mdOpenMenu(ev);
        };
        vm.mShowCodeData = false;
        vm.mSetCodeData = mSetCodeData;
        vm.activateMCodeData = () => vm.mShowCodeData = true;
        vm.resetMCodeData = () => vm.mShowCodeData = false;
        vm.mCodeData = {};

        vm.inspect = {};
        vm.inspect.data = vm.publication.metadata.o2r.inputfiles;
        /* TODO
        Replace this code with the right path to code files as soon as metadata contains this information
        */
        vm.inspect.code = [];
        /*
        vm.inspect.code.push({
            path: vm.publication.metadata.o2r.file.filepath,
            type: vm.publication.metadata.o2r.file.mimetype,
            name: vm.publication.metadata.o2r.file.filename
        });
        */
        
        vm.loggedIn = login.isLoggedIn();
        vm.shipped = false;
        vm.publish = true;
        vm.sendToZenodo = sendToZenodo;
        vm.publishInZenodo = publishInZenodo;

        // only necessary for substitited ERC
        vm.showERC = showERC;
        vm.substitution = {};
        if (vm.publication.metadata.substituted) {
            vm.substitution.substituted = vm.publication.metadata.substituted;
            vm.substitution.baseID = vm.publication.metadata.substitution.base;
            vm.substitution.overlayID = vm.publication.metadata.substitution.overlay;
        } else {
            vm.substitution.substituted = false;
        }

        logger.info(vm.publication);

        activate();

        /////

        function activate(){
            header.setTitle('o2r - Examine ERC');
            $state.go(defView.state);
            getShipment();
        }

        function showERC(url) {
            let url_ = "#!/erc/" + url;
            $window.open(url_);
        }

        function getShipment(){
            httpRequests.getShipment(vm.ercId)
                .then(function (res){
                    logger.info(res);
                    if(res.data.length > 0){
                        vm.shipped=true;
                        httpRequests.getStatus(res.data[0])
                        .then(function (res2){
                            logger.info(res2);
                            if (res2.data.status == "shipped"){
                                vm.publish = false;
                            }
                            if (res2.data.status == "published"){
                                vm.publish = true;
                            }
                        })
                        .catch(function (err2){
                            logger.info(err2);
                        })
                    }
                })
                .catch(function (err){
                    logger.info(err);
                });
        }

        function sendToZenodo(){
            var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('10px');
			progressbar.start();

            httpRequests.toZenodo(vm.ercId)
            .then(function (res) {
					logger.info(res);
                    vm.shipped=true;
                    vm.publish=false;
                    progressbar.complete();
			})
            .catch(function (err){
                logger.info(err);
            })
        }

        function publishInZenodo(){
            httpRequests.getShipment(vm.ercId)
                .then(function (res){
                    httpRequests.publishERC(res.data[0])
                    .then(function (res2){
                        logger.info("published")
                        logger.info(res2)
                    })
                    .catch(function (err2){
                        logger.info(err2);
                    })
                })
                .catch(function (err){
                    logger.info(err);
                });
        }

        function fixPath(path){
            return '/api/v1/compendium/' + vm.ercId + "/data/" + path;
        }

        function buildToggler(navId){
            return function(){
                $mdSidenav(navId)
                    .toggle();
            };
        }

        function checkForOriginal(){
            vm.originalSelected = angular.equals(vm.file, vm.originalfile);
        }

        function showOriginal(){
            vm.file = angular.copy(vm.originalfile);
            checkForOriginal();
        }

        /**
         *
         * @param {Object} obj, expects an object with two attributes: code, data. Each attribute is an array
         */
        function mSetCodeData(obj){
            vm.mCodeData = obj;
            vm.mCodeData.publication = vm.publication;
        }
    }
}
)();
