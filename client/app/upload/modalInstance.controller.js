(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);
/*
    ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'metadata', 'Upload', 'author', 'env'];

    function ModalInstanceCtrl ($scope, $uibModalInstance, metadata, Upload, author, env){
        var vm = this;
        
        vm.checkUpload = false;
        vm.doneButton = false;
        vm.selected = (file) => {vm.f = file;};
        vm.upload = uploader;
        vm.ok = function(){
            $uibModalInstance.close();
            vm.doneButton = false;
        };
        vm.cancel = function(){
            $uibModalInstance.dismiss('cancel');
            vm.doneButton = false;
        };
        vm.submit = function(){
            if($scope.form.file.$valid && vm.file){
                vm.upload(vm.file);
            }
        };

        /////////////

        function uploader(file){
            Upload.upload({
                url: env.api + '/compendium',
                data: {compendium: file, 'content_type': 'compendium_v1'}
            }).then(successCallback, errorCallback, progress);
            
            function successCallback(response){
                vm.doneButton = true;
                vm.checkUpload = true;
                metadata.callMetadata_author(author);
            }
            function errorCallback(response){
                vm.doneButton = true;
                vm.checkUpload = false;
            }
            function progress(evt){
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded/evt.total));
            }
        }
    }
    */
    ModalInstanceCtrl.$inject= ['$scope', '$mdDialog'];

    function ModalInstanceCtrl($scope, $mdDialog){
        var vm = this;

        vm.cancel = function(){
            $mdDialog.cancel();
        };

    }
})();