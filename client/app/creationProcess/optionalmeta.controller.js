(function(){
    'use strict';

    angular
        .module('starter')
        .controller('OptionalMetaController', OptionalMetaController);
    
    OptionalMetaController.$inject = ['$scope', '$log', 'creationObject', 'icons'];

    function OptionalMetaController($scope, $log, creationObject, icons){
        var logger = $log.getInstance('OptMeta');

        var vm = this;
        vm.icons = icons;
        vm.optional = creationObject.getOptional();

        vm.simpleUpdate = creationObject.simpleUpdate;
        
        $scope.$on('$destroy', function(){
            logger.info(angular.toJson(creationObject.getOptional()));
        });

        activate();

        /////////

        function activate(){

        }
    }

})();