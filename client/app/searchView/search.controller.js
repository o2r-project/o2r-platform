(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', '$stateParams', '$log', 'metadata', 'searchResults', 'header'];

    function SearchCtrl($scope, $stateParams, $log, metadata, searchResults, header){
        var vm = this;
        var searchTerm = $stateParams.term; // reads term query from url

        vm.allPubs = searchResults;

        $log.debug('SearchCtrl, vm.allPubs %o', vm.allPubs);
        vm.setId = (id) => {metadata.setComp_id(id)};
        /*
        TODO 
            * Define submit function*/
        vm.submit = () => $log.debug('hello world');

        activate();

        //////////////

        function activate(){
            //$log.debug(metadata.callMetadata_search('asdf'));
            //return metadata.callMetadata_search('asdf'); // httpRequest for retrieving all compendia fitting search parameters
            header.setTitle('o2r - Search');
        }
        // function is called in asynchronous response from metadata.callMetadata_search()
        /*
        function getMeta_search(meta_search){
            $scope.$broadcast('getFirstComp');
            $scope.$on('loadedAllComps', function(){
                vm.allPubs = metadata.getComp_meta();
            });

            vm.setId = setId; // setter function for comp_id
        }
        */ 
    }
})();