(function(){
    'use strict';

    angular
        .module('starter')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', '$stateParams', '$log', '$location', 'searchResults', 'header', 'icons'];

    function SearchCtrl($scope, $stateParams, $log, $location, searchResults, header, icons){
        var vm = this;
        
        vm.icons = icons;
        vm.searchTerm = $stateParams.q; // reads term query from url
        vm.allPubs = map(searchResults);
        vm.selectedComp = vm.allPubs.data.hits.hits[0]._source;
        vm.selectComp = (comp) => {vm.selectedComp = comp};
        vm.submit = search;
       
        $log.debug('SearchCtrl, vm.allPubs %o', vm.allPubs);
        $log.debug('SearchCtrl, searchTerm %s', vm.searchTerm);

        activate();

        //////////////

        function activate(){
            header.setTitle('o2r - Search');
        } 

        function search(){
           $log.debug('searching for %s', vm.searchModel);
           $location.path('/search').search('q=' + vm.searchModel);
        }

        function map(obj){
           var o = obj.data.hits.hits;
            for(var i in o){
                o[i]._source.id = o[i]._source.compendium_id;
            }
            $log.debug('mapping result: %o', o);
            return obj;
        }
    }
})();