(function(){
    'use strict';

    angular
        .module('starter')
        .controller('AuthorController', AuthorController);

        AuthorController.$inject = ['$scope', '$stateParams','$log', '$document', '$mdDialog', 'metadata', 'authorInfo', 'author', 'Upload', 'env', 'header', 'icons'];

        function AuthorController($scope, $stateParams, $log, $document, $mdDialog, metadata, authorInfo, author, Upload, env, header, icons){
            var logger = $log.getInstance('AuthorCtrl');
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
            vm.showProfile = showProfile;
            vm.showAdmin = () => getUserGroup(author.data.level) == 'Admin';

            logger.info('vm.allPubs: ',vm.allPubs);

            $scope.$on('$destroy', function(){
                $mdDialog.cancel();
            })

            $scope.$on('loadedAllComps', function(event, data){ //allPubs will be set to comp_meta from metadata factory
                vm.allPubs = data;
            });

            activate();
            
            //////////////////

            function activate(){
                header.setTitle('o2r - Author page');

                // httpRequests
                //     .setUserLevel('0000-0003-1042-8548', 42)
                //     .then(function(response){
                //         logger.info('set user level', response);
                //     });
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

            function showProfile(ev){
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent($document[0].body)
                        .clickOutsideToClose(true)
                        .ariaLabel('Profile Information')
                        .title('Profile')
                        .htmlContent(
                            '<table>' + 
                            '<tr><td>Name: </td><td>' + author.data.name + '</td></tr>' +
                            '<tr><td>Orcid: </td><td>' + author.data.id + '</td></tr>' +
                            '<tr><td>User Level: </td><td>' + author.data.level + '</td></tr>' +
                            '<tr><td>User Group: </td><td>' + getUserGroup(author.data.level) + '</td></tr>' +
                            '</table>' +
                            '<br><br>If you want to change your user level, please send an email to daniel.nuest@uni-muenster.de.'
                        )
                        .targetEvent(ev)
                        .ok('Close')
                );
            }

            function getUserGroup(level){
                if(level >= env.userLevels.admin) return 'Admin';
                if(level >= env.userLevels.regular) return 'Regular';
                if(level >= env.userLevels.restricted) return 'Restricted';
            }

        }
})();