(function(){
    'use strict';

    angular
        .module('starter')
        .controller('AuthorCtrl', AuthorCtrl);

        AuthorCtrl.$inject = ['$scope', '$stateParams', '$uibModal', 'metadata'];

        function AuthorCtrl($scope, $stateParams, $uibModal, metadata){
            var vm = this;
            var authorId = $stateParams.authorid; // id from author
            
            vm.sortType = 'date'; // helper for sorting
            vm.sortReverse = true; // helper for sorting
            vm.filterContent = 'content'; // helper for contentfilter
            vm.open = openModal; // handle Modal

            activate();
            
            //////////////////

            function activate(){
                metadata.callMetadata_author(authorId, getMeta_author); // httpRequest for retrieving all compendia from one author
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
            // function is called in asynchronous response from metadata.callMetadata_author()
            function getMeta_author(meta_author){
                $scope.$broadcast('getLatestComp');
                $scope.$on('loadedAllComps', function(){ //allPubs will be set to comp_meta from metadata factory
                    vm.allPubs = metadata.getComp_meta();
                });
                vm.setId = function(id){ // setter function for comp_id
                    metadata.setComp_id(id);
                };  
            }
        }
})();