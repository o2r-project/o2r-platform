(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareController', CompareController);

    CompareController.$inject = ['$stateParams', '$log'];
    function CompareController($stateParams, $log) {
        
        var first = {};
        var second = {};
        var vm = this;
        vm.toCompare = [];
        $log.debug($stateParams);
        if ($stateParams.left) { //first url exists
            first.path = $stateParams.left;
            if ($stateParams.lmime) { // mime type exists
                first.type = $stateParams.lmime;
            }
            vm.toCompare.push(first);
            if ($stateParams.right) { //second url exists
                second.path = $stateParams.right;
                if ($stateParams.rmime) {// second mime type exists
                    second.type = $stateParams.rmime;
                }
                vm.toCompare.push(second);
            } else {    // if second url is not defined, call the temporary modified file
                var tmp = '';
                vm.toCompare.push({path: $stateParams.url + tmp});
            }
        }
        $log.debug(vm.toCompare);
    }
})();