(function(){
    'use strict';

    angular
        .module('starter')
        .controller('AuthorCtrl', AuthorCtrl);

        AuthorCtrl.$inject = ['$scope', '$stateParams','$log', '$mdDialog', 'metadata', 'authorInfo', 'Upload', 'env', 'header'];

        function AuthorCtrl($scope, $stateParams, $log, $mdDialog, metadata, authorInfo, Upload, env, header){
            var vm = this;
           
            var authorId = $stateParams.authorid; // id from author
            
            vm.allPubs = getAuthorInfo();
            vm.compExists = compExistence();
            vm.sortType = 'date'; // helper for sorting
            vm.sortReverse = true; // helper for sorting
            vm.filterContent = 'content'; // helper for contentfilter
            vm.setId = (id) => {metadata.setComp_id(id)};
            vm.selected = []; //required for md-data-table
            vm.openDialog = openDialog;

            $log.debug('AuthorCtrl, vm.allPubs: %o',vm.allPubs);
            activate();
            
            //////////////////

            function activate(){
                header.setTitle('o2r - Landingpage');
            }
            
            function getAuthorInfo(){
                if(authorInfo.status == 404){
                    return false;
                }
                return authorInfo;
            }

            function compExistence(){
                if(authorInfo.status === 404) return false;
                return true;
            }

            function openDialog(ev){
                $mdDialog.show({
                    controller: ModalInstanceCtrl,
                    templateUrl: 'app/upload/uploadModal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                });
            }


            $scope.$on('loadedAllComps', function(){ //allPubs will be set to comp_meta from metadata factory
                vm.allPubs = metadata.getComp_meta();
            });
            
            function ModalInstanceCtrl($scope, $mdDialog, Upload, env){

                $scope.cancel = () => {$mdDialog.cancel()};
                $scope.selected = (file) => {$scope.f = file;};
                $scope.onLoad = false;
                $scope.doneButton = false;
                $scope.fileSelected = false;
                $scope.submit = function(){
                    if($scope.form.file.$valid && $scope.file){
                        $scope.onLoad = true;
                        uploader($scope.file);
                    }
                };

                $scope.$watch('file', function(news, old){
                    if(typeof news !== 'undefined'){
                        $log.debug('selected File: ', news);
                        $scope.fileSelected = true;
                    }
                });
                ////////

                function uploader(file){
                    Upload.upload({
                        url: env.api + '/compendium',
                        data: {compendium: file, 'content_type': 'compendium_v1'}
                    }).then(successCallback, errorCallback, progress);
                    
                    function successCallback(response){
                        $scope.doneButton = true;
                        metadata.callMetadata_author(authorId);
                        $scope.checkUpload = true;
                    }
                    function errorCallback(response){
                        $scope.doneButton = true;
                        $scope.checkUpload = false;
                    }
                    function progress(evt){
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded/evt.total));
                    }
                }
            }
        }
})();