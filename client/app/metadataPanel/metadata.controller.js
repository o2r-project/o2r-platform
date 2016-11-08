(function(){
    'use strict';
    
    angular
        .module('starter')
        .controller('MetadataCtrl', MetadataCtrl);

    MetadataCtrl.$inject = ['$scope', '$location', '$log', 'metadata'];

    function MetadataCtrl($scope, $location, $log, metadata){
        var vm = this;
        
        vm.isSpecial = isSpecial;
        vm.compMeta = metadata.getLatestComp();
        
        $log.debug('MetadataCtrl, compMeta: %o', vm.compMeta);

        $scope.$on('loadedAllComps', function(){ //Controller starts when previous httpRequest is finished
            setCompStatus();
        });
        $scope.$on('changedComp_id', function(event, data){ //watch if comp_id changes in factory
            $log.debug('changedComp_id');
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
                    $log.debug('MetadataCtrl, compMeta.status: %o', vm.compMeta.status);
                });
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