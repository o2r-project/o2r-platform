(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcController', ErcController);

    ErcController.$inject = ['$scope', '$stateParams', '$log', '$state', '$window', '$mdDialog', 'erc', 'publications', 'icons', 'header', 
                                '$mdSidenav', 'env', 'ngProgressFactory', 'httpRequests', 'login', 'compFJobSuccess', 'jobs', 
                                    'compendium', 'recipient', 'shipmentInfo'];
    function ErcController($scope, $stateParams, $log, $state, $window, $mdDialog, erc, publications, icons, header, 
                                $mdSidenav, env, ngProgressFactory, httpRequests, login, compFJobSuccess, jobs, 
                                    compendium, recipient, shipmentInfo){
        var logger = $log.getInstance('ErcCtrl');
        var defView = {};
        defView.state = 'erc.reproduce';
        defView.name = 'reproduce';
        
        var vm = this;
        vm.icons = icons;
        vm.server = env.server;
        vm.recipient = recipient.data.recipients;
        vm.shipmentInfo = shipmentInfo;
        vm.publication = erc;
        compendium.setCompendium(vm.publication);
        vm.ercId = vm.publication.id;
        vm.recipientObject = {};
        vm.recipientObject.ercId = vm.ercId;
        vm.recipientObject.shipmentInfo = vm.shipmentInfo;
        vm.recipientObject.recipient = vm.recipient;
        vm.file = publications.getContentById(vm.publication, fixPath(vm.publication.metadata.o2r.displayfile));
        vm.originalfile = angular.copy(vm.file);
        vm.currentNavItem = defView.name;
        vm.toggleSidenav = buildToggler('sidenav');
        vm.originalSelected = true;
        vm.checkForOriginal = checkForOriginal;
        vm.showOriginal = showOriginal;
        vm.checkORsubstituted = "Check";
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
            path: vm.publication.metadata.raw.file.filepath,
            type: vm.publication.metadata.raw.file.mimetype,
            name: vm.publication.metadata.raw.file.filename
        });
        */

        vm.loggedIn = login.isLoggedIn();
        vm.shipped = false;
        vm.publish = true;
        logger.info(vm.shipmentInfo);
        vm.sendToRecipient = sendToRecipient;
        // vm.publishInZenodo = publishInZenodo;
        // only necessary for substitited ERC
        vm.showERC = showERC;
        vm.isEmpty = isEmpty;
        vm.fJob = compFJobSuccess.data;  // return last finished job
        if(typeof vm.fJob ==  "string"){
            //jobs.executeJob(vm.ercId);
        }
        vm.substitution = {};
        if (vm.publication.substituted) {
            vm.checkORsubstituted = "Substitution results";
            vm.substitution.substituted = vm.publication.substituted;
            vm.substitution.baseID = vm.publication.metadata.substitution.base;
            vm.substitution.overlayID = vm.publication.metadata.substitution.overlay;
        } else {
            vm.substitution.substituted = false;
        }
        vm.compareSubstBaseHtml = compareSubstBaseHtml;

        logger.info(vm.publication);
        logger.info(vm.recipient);

        activate();

        /////

        $(document).ready(function(){
            setTimeout(function(){ 
            var iframe = $('iframe').contents();
                iframe.click(function(){
                    var selectedText = document.getElementsByTagName('iframe')[0].
                        contentWindow.document.getSelection().toString();
                    vm.publication.metadata.o2r.interaction.forEach(function(element){
                        if (element.result.value == selectedText) {
                            $scope.$broadcast('broadcastSelection', selectedText);
                            switchTab();
                        }
                    });

                });
            }, 3000);
        });

        function switchTab() {
            vm.currentNavItem = 'manipulate';
            $state.go('erc.manipulate')
        }

        function activate(){
            header.setTitle('o2r - Examine ERC');
            $state.go(defView.state);
            // getShipment();
        }

        function showERC(url) {
            let url_ = "#!/erc/" + url;
            $window.open(url_);
        }

        function isEmpty(obj){
            if (obj != undefined) {
                for(var key in obj){
                    if(obj.hasOwnProperty(key)) return false;
                }
                return true;
            } else {
                return true;
            }
        }

        function compareSubstBaseHtml(ev) {
            // get finished job of base ERC
            var ercId = vm.substitution.baseID;
            var query = {
                compendium_id: ercId
                // status: 'success'
            };
            return jobs.callJobs(query).then(function(result){
                if(result.status == 404 || result.data == "No analysis executed yet."){
                    logger.info("No jobs finished in base ERC.\nPlease run analysis.");
                    window.alert("No jobs finished in base ERC.\nPlease run analysis.");
                } else {
                    // check if step-check was success or failure
                    if (result.data.steps.check.status == "failure" || result.data.steps.check.status == "success") {
                        logger.info("jobs found");

                        let subst = {};
                        subst.id = vm.ercId;
                        subst.compFJobSucc = vm.fJob;
                        let base = {};
                        base.id = vm.substitution.baseID;
                        base.compFJobSucc = result.data;

                        let html = {};
                        html.base = base.compFJobSucc.steps.check.display.diff // "/api/v1/job/<job_id/path/to/html>"
                        html.subst = subst.compFJobSucc.steps.check.display.diff  // "/api/v1/job/<job_id/path/to/html>"

                        $mdDialog.show({
                            template: '<md-dialog aria-label="check results" class="substitute_magnifier"><o2r-compare-base-subst o2r-base-html="'+html.base+'" o2r-subst-html="'+html.subst+'" flex="100"></o2r-compare-base-subst></md-dialog>',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            fullscreen: true,
                            clickOutsideToClose: true
                        });
                    } else {
                        logger.info("No analysis finished, that provides a html file for comparison reasons.");
                        window.alert("No analysis finished, that provides a html file for comparison reasons.");
                    }
                }
            });
        }

        // function getShipment(){
        //     // httpRequests.getShipment(vm.ercId)
        //     //     .then(function (res){
        //     //         logger.info(res);
        //     //         if(res.data.length > 0){
        //     //             vm.shipped=true;
        //     //             httpRequests.getStatus(res.data[0])
        //     //             .then(function (res2){
        //     //                 logger.info(res2);
        //     //                 if (res2.data.status == "shipped"){
        //     //                     vm.publish = false;
        //     //                 }
        //     //                 if (res2.data.status == "published"){
        //     //                     vm.publish = true;
        //     //                 }
        //     //             })
        //     //             .catch(function (err2){
        //     //                 logger.info(err2);
        //     //             })
        //     //         }
        //     //     })
        //     //     .catch(function (err){
        //     //         logger.info(err);
        //     //     });
        //     httpRequests.getCompShipment(vm.ercId)
        //         .then(function(res){
        //             logger.info(res);
        //         })
        //         .catch(function(err){
        //             logger.error(err);
        //         });
        // }

        function sendToRecipient(recip){
            var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('10px');
			progressbar.start();
            logger.info('recipient', recip);
            httpRequests.newShipment(vm.ercId, recip)
            .then(function (res) {
					logger.info(res);
                    vm.shipped=true;
                    vm.publish=false;
                    progressbar.complete();
			})
            .catch(function (err){
                logger.info(err);
            });     
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
         * @param {Object} obj, expects an object with two attributes: code, data. Each attribute is an array
         */
        function mSetCodeData(obj){
            vm.mCodeData = obj;
            vm.mCodeData.publication = vm.publication;
        }
    }
}
)();
