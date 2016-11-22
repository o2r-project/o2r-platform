(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', '$stateParams', '$log', '$location', 'metadata', 'searchResults', 'header', 'icons'];

    function SearchCtrl($scope, $stateParams, $log, $location, metadata, searchResults, header, icons){
        var vm = this;
        
        vm.icons = icons;
        vm.searchTerm = $stateParams.q; // reads term query from url
        vm.allPubs = searchResults;
        vm.setId = (id) => {metadata.setComp_id(id)};
        vm.submit = search;
       
        $log.debug('SearchCtrl, vm.allPubs %o', vm.allPubs);
        $log.debug('SearchCtrl, searchTerm %s', vm.searchTerm);

        activate();

        //////////////

        function activate(){
            //$log.debug(metadata.callMetadata_search('asdf'));
            header.setTitle('o2r - Search');
        } 

        function search(){
           //metadata.callMetadata_search(vm.searchModel);
           $log.debug('searching for %s', vm.searchModel);
           $location.path('/search').search('q=' + vm.searchModel);
        }
    }
})();