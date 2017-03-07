(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareController', CompareController);

    CompareController.$inject = ['$scope', '$stateParams', '$log'];
    function CompareController($scope, $stateParams, $log){
        var first = {};
        var second = {};
        var vm = this;
        vm.toCompare = [];
        $log.debug($stateParams);
        if($stateParams.url){ //first url exists
            first.path = $stateParams.url;
            if($stateParams.urltype){ // mime type exists
                first.type = $stateParams.urltype;
            }
            vm.toCompare.push(first);
            if($stateParams.tocompareurl){ //second url exists
                second.path = $stateParams.tocompareurl;
                if($stateParams.tocomparetype){// second mime type exists
                    second.type = $stateParams.tocomparetype;
                }
                vm.toCompare.push(second);
            } else {    // if second url is not defined, call the temporary modified file
                var tmp = '';
                vm.toCompare.push({path: $stateParams.url + tmp});
            }
        }
        
    }
})();