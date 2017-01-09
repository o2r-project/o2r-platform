(function(){
    'use strict';

    angular
        .module('starter')
        .controller('AuthorController', AuthorController);

        AuthorController.$inject = ['$scope', '$stateParams','$log', '$document', '$mdDialog', 'metadata', 'authorInfo', 'Upload', 'env', 'header', 'icons'];

        function AuthorController($scope, $stateParams, $log, $document, $mdDialog, metadata, authorInfo, Upload, env, header, icons){
            var vm = this;
           
            
            
            vm.icons = icons;
            vm.allPubs = getAuthorInfo();
            vm.compExists = compExistence();
            vm.sortType = 'date'; // helper for sorting
            vm.sortReverse = true; // helper for sorting
            vm.filterContent = 'content'; // helper for contentfilter
            vm.selectedComp = vm.allPubs[vm.allPubs.length-1];
            vm.selectComp = (comp) => {vm.selectedComp = comp};
            vm.selected = []; //required for md-data-table
            vm.openDialog = openDialog;

            $log.debug('AuthorCtrl, vm.allPubs: %o',vm.allPubs);
            activate();
            
            //////////////////

            function activate(){
                header.setTitle('o2r - Author page');
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
                    controller: 'UploadModalController',
                    controllerAs: 'vm',
                    templateUrl: 'app/upload/uploadModal.html',
                    parent: $document[0].body,
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                });
            }


            $scope.$on('loadedAllComps', function(event, data){ //allPubs will be set to comp_meta from metadata factory
                vm.allPubs = data;
            });
        }
})();