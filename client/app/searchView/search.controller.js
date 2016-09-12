(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', '$stateParams', 'metadata'];

    function SearchCtrl($scope, $stateParams, metadata){
        var vm = this;
        var searchTerm = $stateParams.term; // reads term query from url

        vm.setId;
        vm.allPubs = {};
        /*
        TODO 
            * Define submit function*/
        vm.submit = () => console.log('hello world');

        activate();

        //////////////

        function activate(){
            metadata.callMetadata_search(searchTerm, getMeta_search); // httpRequest for retrieving all compendia fitting search parameters
        }
        // function is called in asynchronous response from metadata.callMetadata_search()
        function getMeta_search(meta_search){
            $scope.$broadcast('getFirstComp');
            $scope.$on('loadedAllComps', function(){
                vm.allPubs = metadata.getComp_meta();
            });

            vm.setId = setId; // setter function for comp_id
        }
        function setId(id){
            metadata.setComp_id(id);
        }  
    }
})();