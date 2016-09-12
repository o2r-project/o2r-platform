(function(){
    'use strict';
    
    angular
        .module('starter')
        .controller('MetadataCtrl', MetadataCtrl);

    MetadataCtrl.$inject = ['$scope', '$location', 'metadata'];

    function MetadataCtrl($scope, $location, metadata){
        var vm = this;

        vm.submit = submitter; // triggered on GoTo Button. Gets the id of last clicked publication and calls url /erc/:ercid
        vm.caps = caps; // Changes first letter of word into capital letter
        vm.isSpecial = isSpecial;
        vm.compMeta;
        
        $scope.$on('loadedAllComps', function(){ //Controller starts when previous httpRequest is finished
            metadata.callJobStatus(vm.compMeta.id, getJobMeta);
        });
        $scope.$on('getLatestComp', function(){
            vm.compMeta = metadata.getLatestComp();
        });
        $scope.$on('getFirstComp', function(){
            vm.compMeta = metadata.getFirstComp();
        });
        $scope.$on('changedComp_id', function(event, data){ //watch if comp_id changes in factory
            vm.compMeta = metadata.getOneComp(data);
            metadata.callJobStatus(vm.compMeta.id, getJobMeta);
        });

        /////////////////

        //function is called in asynchronous response from metadata.callJobStatus()
        function getJobMeta(meta){
            vm.compMeta.status = meta;
        }
        function submitter(){
            var _url = '/erc/' + vm.compMeta.id;
            $location.path(_url);
        }
        function caps(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        function isSpecial(key){
            var special;
            switch(key){
                case 'files':
                    special = true;
                    break;
                case 'status':
                    special = true;
                    break;
                default:
                    special = false;
            }
            return special;
        }
    }
})();