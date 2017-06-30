(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CreationProcessController', CreationProcessController);
    
    CreationProcessController.$inject = ['$scope', '$document', '$log', '$state', '$mdDialog', '$mdToast', 'creationService', 'creationObject', 'httpRequests', 'icons'];

    function CreationProcessController($scope, $document, $log, $state, $mdDialog, $mdToast, creationService, creationObject, httpRequests, icons){
        var logger = $log.getInstance('CreationPro');
        //default substate
        var defView = 'creationProcess.requiredMetadata';
        var saved = false;
        var vm = this;
        vm.icons = icons;
        vm.updateMetadata = updateMetadata;
        vm.setFormValid = setFormValid;
        vm.isValid = false;
        vm.cancel = cancel;
        vm.state = $state;
        vm.nextState = nextState;
        vm.previousState = previousState;

        $scope.$on('$destroy', function(){
            saved = false;
            creationObject.destroy();
        });

        $scope.$on('$locationChangeStart', function(event, url){
            logger.info('on state change');
            if(!saved){
                $log.debug('did not change state');
                event.preventDefault();
            }
        });

        activate();

        /////////

        function activate(){
            creationObject.set(creationService);
            $state.go(defView);
        }

        function updateMetadata(){
            creationObject.removeArtifacts("keywords");
            creationObject.removeArtifacts("paperLanguage");
            creationObject.removeArtifacts("researchQuestions");
            creationObject.removeArtifacts("researchHypotheses");
            creationObject.removeArtifacts("author");
            var erc = creationObject.get();
            httpRequests
                .updateMetadata(erc.id, erc.metadata.o2r)
                .then(function(res){
                    logger.info(res);   
                    saved = true;
                    showToast();
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

        function cancel(ev){
            logger.info($mdDialog);
            var confirm = $mdDialog
                            .confirm()
                            .title('Do you want to cancel?')
                            .textContent('This action cancels the ERC upload. All uploads and changes will be deleted!')
                            .ariaLabel('Confirm cancellation')
                            .targetEvent(ev)
                            .parent($document[0].body)
                            .ok('Cancel and Delete')
                            .cancel('Continue uploading');
            
            $mdDialog
                .show(confirm).then(ok, cancelling);

            function ok(){
                //TODO
                //delete ERC metadata. When reponse, go to homeView


                $state.go('home');
            }

            function cancelling(){

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