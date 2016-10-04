(function(){
    'use strict';

    angular
        .module('starter')
        .controller('AuthorCtrl', AuthorCtrl);

        AuthorCtrl.$inject = ['$scope', '$stateParams','$log', '$uibModal', 'metadata', 'authorInfo'];

        function AuthorCtrl($scope, $stateParams, $log, $uibModal, metadata, authorInfo){
            var vm = this;
           
            var authorId = $stateParams.authorid; // id from author
            
            vm.allPubs = authorInfo;
            vm.compExists = compExistence();
            vm.sortType = 'date'; // helper for sorting
            vm.sortReverse = true; // helper for sorting
            vm.filterContent = 'content'; // helper for contentfilter
            vm.open = openModal; // handle Modal
            vm.setId = (id) => metadata.setComp_id(id);
            
            $log.debug('AuthorCtrl, vm.allPubs: %o',vm.allPubs);
            //activate();
            
            //////////////////

            function activate(){
                metadata.callMetadata_author(authorId); // httpRequest for retrieving all compendia from one author
            }
            function openModal(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/upload/uploadModal.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        author: function(){
                            return authorId;
                        }
                    }
                });
            }
           
            function compExistence(){
                if(authorInfo.status === 404) return false;
                return true;
            }

            $scope.$on('loadedAllComps', function(){ //allPubs will be set to comp_meta from metadata factory
                vm.allPubs = metadata.getComp_meta();
            });
            // function is called in asynchronous response from metadata.callMetadata_author()
            /*
            function getMeta_author(meta_author){
                vm.setId = function(id){ // setter function for comp_id
                    metadata.setComp_id(id);
                };  
            }
            */
        }
})();