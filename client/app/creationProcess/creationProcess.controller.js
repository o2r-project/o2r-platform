(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CreationProcessController', CreationProcessController);

    CreationProcessController.$inject = ['$scope', '$document', '$log', '$state', '$mdDialog', '$mdToast', 'header', 'creationService', 'creationObject', 'httpRequests', 'icons', '$window'];

    function CreationProcessController($scope, $document, $log, $state, $mdDialog, $mdToast, header, creationService, creationObject, httpRequests, icons, $window){
        var logger = $log.getInstance('CreationPro');
        //default substate
        var defView = 'creationProcess.requiredMetadata';
        var saved = false;
        var cancelled = false;
        var vm = this;
        vm.icons = icons;
        vm.updateMetadata = updateMetadata;
        vm.setFormValid = setFormValid;
        vm.isValid = false;
        vm.cancel = cancel;
        vm.state = $state;
        vm.nextState = nextState;
        vm.previousState = previousState;
        vm.goTo = (to) => $state.go(to);
        vm.switchedTab = false;
        vm.showERC = false;
        vm.saveOrUpdate = "Save";

        $scope.$on('$destroy', function(){
            saved = false;
            cancelled = false;
            vm.switchedTab = false;
            creationObject.destroy();
            removeUnloadEvent();
        });

        $scope.$on('$stateChangeStart', function(event, toState){
            if(!(cancelled || saved)){
                switch (toState.name) {
                    case 'creationProcess.requiredMetadata':
                        break;
                    case 'creationProcess.optionalMetadata':
                        break;
                    case 'creationProcess.spacetimeMetadata':
                        break;
                    case 'creationProcess.uibindings':
                        break;
                    default:
                        event.preventDefault();
                        showNoStateChangeToast();
                        break;
                }
            }
        });

        $scope.$on('$stateChangeSuccess', function(event, toState){
            switch (toState.name) {
                case 'creationProcess.requiredMetadata':
                    break;
                case 'creationProcess.optionalMetadata':
                    vm.switchedTab = true;
                    break;
                case 'creationProcess.spacetimeMetadata':
                    vm.switchedTab = true;
                    break;
                case 'creationProcess.uibindings':
                    vm.switchedTab = true;
                    break;
                default:
                    break;
            }
        });

        activate();

        /////////

        function activate(){
            header.setTitle('o2r - Edit ERC');
            creationObject.set(creationService);
            httpRequests.singleCompendium(creationService.id).then(function(res){
                logger.info('this is my erc', angular.fromJson(res.data));
                if(angular.isUndefined(res.data.candidate)){
                    vm.showERC = res.data.candidate;
                    vm.ercURL= "#!/erc/" + res.data.id;
                    vm.saveOrUpdate = "Update";
                }
            }).catch(function(e){
                logger.info(e);
            })
            $state.go(defView);
            addUnloadEvent();
        }

        function addUnloadEvent(){
            if($window.addEventListener){
                $window.addEventListener('beforeunload', handleUnloadEvent);
            } else {
                $window.attachEvent('onbeforeunload', handleUnloadEvent);
            }
        }

        function handleUnloadEvent(event){
            event.returnValue = 'Do you want to leave the page?';
        }

        function removeUnloadEvent(){
            if($window.removeEventListener){
                $window.removeEventListener('beforeunload', handleUnloadEvent);
            } else {
                $window.detachEvent('onbeforeunload', handleUnloadEvent);
            }
        }

        function updateMetadata(){
            creationObject.removeArtifacts("keywords");
            creationObject.removeArtifacts("paperLanguage");
            creationObject.removeArtifacts("researchQuestions");
            creationObject.removeArtifacts("researchHypotheses");
            creationObject.removeArtifacts("author");
            var erc = creationObject.get();
            if (erc.metadata.o2r.interaction.length == 0) {
                var codeBinding = {
                    compendiumId: erc.id,
                    task: "inspect",
                    purpose: "showPaperCode",
                    mainfile: erc.metadata.o2r.mainfile
                }
                if (erc.metadata.o2r.inputfiles.length > 0){
                    var dataBinding = {
                        compendiumId: erc.id,
                        task: "inspect",
                        purpose: "showPaperData",
                        mainfile: erc.metadata.o2r.inputfiles
                    }                    
                }
                erc.metadata.o2r.interaction.push(codeBinding);
                erc.metadata.o2r.interaction.push(dataBinding);
            }
            httpRequests
                .updateMetadata(erc.id, erc.metadata.o2r)
                .then(function(res){
                    logger.info(res);  
                    erc.metadata.o2r.saved=true;
                    vm.ercURL= "#!/erc/" + erc.id;
                    vm.showERC=true;
                    saved = true;
                    showToast();
                    vm.saveOrUpdate = "Update";
                })
                .catch(function(e){
                    logger.info(e);
                    showToast(e)
                })
        }

        function setFormValid(val){
            vm.isValid = val;
        }

        function showToast(error){
            var text = 'Saved successfully!';
            var toastClass = 'creationProcess-success-toast';
            if(angular.isDefined(error)){
                text = 'Failed saving!';
                toastClass = 'creationProcess-failure-toast';
            }
            $mdToast.show(
                $mdToast
                    .simple()
                    .textContent(text)
                    .position('top right')
                    .toastClass(toastClass)
                    .hideDelay(3000)
                    .parent($document[0].body.children.main.children["ui-view"])
            );
        }

        function showNoStateChangeToast(){
            var text = 'Info: You need to Save or Cancel to leave page.';
            $mdToast.show(
                $mdToast
                    .simple()
                    .textContent(text)
                    .position('top right')
                    .hideDelay(3000)
                    .parent($document[0].body.children.main.children["ui-view"])
            );
        }

        function cancel(ev){
            logger.info($mdDialog);
            var cancelAndDelete = $mdDialog
                            .confirm()
                            .title('Do you want to cancel?')
                            .textContent('This action cancels the ERC upload. All uploads and changes will be deleted!')
                            .ariaLabel('Confirm cancellation')
                            .targetEvent(ev)
                            .parent($document[0].body)
                            .ok('Cancel and Delete')
                            .cancel('Continue uploading');

            var cancelNoDelete = $mdDialog
                            .confirm()
                            .title('Do you want to cancel?')
                            .textContent('All unsaved changes will be deleted.')
                            .ariaLabel('Confirm cancellation')
                            .targetEvent(ev)
                            .parent($document[0].body)
                            .ok('Cancel')
                            .cancel('Continue editing');

            if(vm.saveOrUpdate == 'Save'){
                $mdDialog
                    .show(cancelAndDelete).then(cancelDelete, doNothing);
            } else if(vm.saveOrUpdate == 'Update'){
                $mdDialog
                    .show(cancelNoDelete).then(cancelling, doNothing);
            }

            function cancelDelete(){
                logger.info('compId for delete', creationService.id);
                httpRequests
                    .deleteCompendium(creationService.id)
                    .then(function(res){
                        logger.info('response from delete', res);
                        cancelled = true;
                        $state.go('home');
                    });
            }

            function cancelling(){
                cancelled = true;
                $state.go('home');
            }

            function doNothing(){
                //continue with editing
                //no action needed for this
            }


        }

        function nextState(current){
            var goto;
            switch (current) {
                case 'creationProcess.requiredMetadata':
                    goto = 'optionalMetadata';
                    break;
                case 'creationProcess.optionalMetadata':
                    goto = 'spacetimeMetadata';
                    break;
                case 'creationProcess.spacetimeMetadata':
                    goto = 'uibindings';
                    break;
                default:
                    break;
            }
            $state.go('creationProcess.' + goto);
        }

        function previousState(current){
            var goto;
            switch (current) {
                case 'creationProcess.optionalMetadata':
                    goto = 'requiredMetadata';
                    break;
                case 'creationProcess.spacetimeMetadata':
                    goto = 'optionalMetadata';
                    break;
                case 'creationProcess.uibindings':
                    goto = 'spacetimeMetadata';
                    break;
                default:
                    break;
            }
            $state.go('creationProcess.' + goto);
        }
    }

})();
