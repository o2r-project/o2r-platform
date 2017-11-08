(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UploadModalController', UploadModalController);
    
    UploadModalController.$inject = ['$scope', '$stateParams', '$mdDialog', '$log', 'metadata', 'Upload', 'env', 'icons', 'jobs', '$location', 'httpRequests'];

    function UploadModalController($scope, $stateParams, $mdDialog, $log, metadata, Upload, env, icons, jobs, $location, httpRequests){
        var logger = $log.getInstance('UploadCtrl');
        // var authorId = $stateParams.authorid; // id from author
        var authorId;
        var uploadSuccess = false;
        var newErcId = '';
        var vm = this;
        vm.icons = icons;
        // vm.checkRunAnalysis = true;
        vm.uploadedERCid = false;
        vm.cancel = () => {
            $mdDialog.cancel(); 
        };
        vm.done = function() {
                        $mdDialog.cancel();
                        if(uploadSuccess){
                            $location.path('/creationProcess/' + newErcId);
                        }
                    };            
        vm.selected = (file) => {vm.f = file;};
        vm.onLoad = false;
        vm.doneButton = false;
        vm.fileSelected = false;
        vm.uploadError;
        vm.submit = function(){
            if(vm.form.file.$valid && angular.isDefined(vm.file)){
                //deactivate submit button
                vm.fileSelected = false;

                vm.onLoad = true;
                uploader(vm.file);
            }
        };

        $scope.$watch('vm.file', function(newVal){
            if(angular.isDefined(newVal)){
                $log.debug('selected File: ', newVal);
                vm.fileSelected = true;
            }
        });

        ////////

        function uploader(file){
            Upload.upload({
                url: env.api + '/compendium',
                data: {compendium: file, 'content_type': 'workspace'}
            })
            .progress(function(evt){
                file.progress = parseInt(95.0 * evt.loaded/evt.total);
            })
            .success(function(response, status, headers, config){
                newErcId = response.id;
                vm.cancel = function(){
                    logger.info('cancelling from success');
                    httpRequests
                    .deleteCompendium(newErcId)
                    .then(function(res){
                        logger.info('cancelled upload and deleted comp');
                        $mdDialog.cancel();
                    });
                };
                logger.info('upload successCallback: ', angular.toJson(response));
                uploadSuccess = true;
                vm.doneButton = true;
                vm.checkUpload = true;
                file.progress = 100;
            })
            .error(function(response, status, headers, config){
                logger.info('upload errorCallback', response);
                file.progress = 100;
                vm.doneButton = true;
                vm.checkUpload = false;
                vm.uploadError = response.error;
                uploadSuccess = false;
            })
            .xhr(function(xhr){
                logger.info('xhr', xhr);
                vm.cancel = function(){
                    logger.info('overwrite cancel function');
                    xhr.abort();
                    $mdDialog.cancel();
                };

            });
        }
    }
})();