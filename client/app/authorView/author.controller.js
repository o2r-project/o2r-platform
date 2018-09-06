(function(){
    'use strict';

    angular
        .module('starter')
        .controller('AuthorController', AuthorController);

        AuthorController.$inject = ['$scope', '$log', '$document', '$mdDialog', 'authorInfo', 'author', 'Upload', 'env', 'header', 'icons'];

        function AuthorController($scope, $log, $document, $mdDialog, authorInfo, author, Upload, env, header, icons){
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
            vm.showAdmin = () => ((getUserGroup(author.data.level) == 'Admin') || (getUserGroup(author.data.level) == 'Editor'));

            logger.info('vm.allPubs: ',vm.allPubs);

            $scope.$on('$destroy', function(){
                $mdDialog.cancel();
            })

            $scope.$on('loadedAllComps', function(event, data) {
                vm.allPubs = data;
            });

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
                    clickOutsideToClose: false,
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
                            '<tr><td>ORCID: </td><td><img src="img/orcid.png" alt="ORCID icon" height="12" />&nbsp;<a href="https://orcid.org/' + author.data.id + '">orcid.org/' + author.data.id + '</a></td></tr>' +
                            '<tr><td>Level (<a href="https://o2r.info/api/user/#user-levels" title="Information about user levels">?</a>): </td><td>' + getUserGroup(author.data.level) + '</td></tr>' +
                            '</table>' +
                            '<br><br>If you want to change your user level, please send an email to daniel.nuest@uni-muenster.de.'
                        )
                        .targetEvent(ev)
                        .ok('Close')
                );
            }

            function getUserGroup(level){
                if(level >= env.userLevels.admins) return 'Admin';
                if(level >= env.userLevels.editors) return 'Editor'
                if(level >= env.userLevels.knowns) return 'Known User';
                if(level >= env.userLevels.users) return 'New User';
            }

        }
})();