(function(){
    'use strict';

    angular
        .module('starter')
        .controller('UploadModalController', UploadModalController);
    
    UploadModalController.$inject = ['$scope', '$stateParams', '$mdDialog', '$log', 'metadata', 'Upload', 'env', 'icons', 'jobs', '$location'];

    function UploadModalController($scope, $stateParams, $mdDialog, $log, metadata, Upload, env, icons, jobs, $location){
        var authorId = $stateParams.authorid; // id from author

        var vm = this;
        vm.icons = icons;
        vm.checkRunAnalysis = true;
        vm.uploadedERCid = false;
        vm.cancel = () => {
                        $mdDialog.cancel(); 
                        $location.path('/creationProcess/' + vm.uploadedERCid + '/requiredMetadata');
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
                data: {compendium: file, 'content_type': 'compendium_v1'}
            })
            .then(successCallback, errorCallback, progress);
            
            function successCallback(response){
                if(vm.checkRunAnalysis){
                    jobs.executeJob(response.data.id)
                        .then(execJobCallback, errorCallback);
                } else {
                    $log.debug('upload successCallback: %o', response);
                    vm.doneButton = true;
                    metadata.callMetadata_author(authorId);
                    vm.checkUpload = true;
                    file.progress = 100;
                }
            }
            function errorCallback(response){
                $log.debug('upload errorCallback %o', response);
                file.progress = 100;
                vm.doneButton = true;
                vm.checkUpload = false;
                vm.uploadError = response;
            }
            function progress(evt){
                file.progress = parseInt(95.0 * evt.loaded/evt.total);
            }
            function execJobCallback(response){
                $log.debug('upload execJobCallback: %o', response);
                vm.uploadedERCid = response.data.compendium_id;
                console.log(vm.uploadedERCid);
                if(vm.checkRunAnalysis){
                    vm.doneButton = true;
                    metadata.callMetadata_author(authorId);
                    vm.checkUpload = true;
                    file.progress = 100;
                }
                
            }
        }
    }

})();