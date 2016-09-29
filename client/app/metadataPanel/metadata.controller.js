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
        vm.compMeta = metadata.getLatestComp();
        
        console.log('MetadataCtrl, compMeta: %o', vm.compMeta);

        $scope.$on('loadedAllComps', function(){ //Controller starts when previous httpRequest is finished
            setCompStatus();
        });
        $scope.$on('changedComp_id', function(event, data){ //watch if comp_id changes in factory
            console.log('changedComp_id');
            vm.compMeta = metadata.getOneComp(data);
            setCompStatus();
        });

        activate()
        /////////////////

        function activate(){
            setCompStatus();
        }
        function setCompStatus (){
            metadata.callJobStatus(vm.compMeta.id)
                .then(function(res){
                    vm.compMeta.status = res.data;
                    console.log('MetadataCtrl, compMeta.status: %o', vm.compMeta.status);
                });
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