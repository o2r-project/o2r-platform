(function(){
    'use strict';

    angular
        .module('starter')
        .controller('CompareController', CompareController);

    CompareController.$inject = ['$scope', '$stateParams', '$log', 'publications'];
    function CompareController($scope, $stateParams, $log, publications){
        
        var first = {};
        var second = {};
        var vm = this;
        vm.toCompare = [];
        $log.debug($stateParams);
        if($stateParams.left){ //first url exists
            first.path = $stateParams.left;
            if($stateParams.lmime){ // mime type exists
                first.type = $stateParams.lmime;
            }
            vm.toCompare.push(first);
            if($stateParams.right){ //second url exists
                second.path = $stateParams.right;
                if($stateParams.rmime){// second mime type exists
                    second.type = $stateParams.rmime;
                }
                vm.toCompare.push(second);
            } else {    // if second url is not defined, call the temporary modified file
                var tmp = '';
                vm.toCompare.push({path: $stateParams.url + tmp});
            }
        }
        $log.debug(vm.toCompare);
        
        /*
        var vm = this;
        vm.methods = {
            inspect: 'Inspect',
            compare: 'Compare'
        };
        vm.method = $stateParams.method;
        vm.publication = compare;
        vm.toCompare;
        vm.origMain = publications.getContentById(compare, fixPath(compare.metadata.o2r.file.filepath));
        vm.setCompare = (path) => vm.toCompare = path;
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };
        $log.debug(vm.origMain);
        //$log.debug(compare);

        //////////

        function fixPath(path){
            var str = '/data/';
            path = '/api/v1/compendium/' + path;
            var newPath = path.replace(str, str+'data/');
            $log.debug('fixed path is: %s', newPath);
            return newPath;
        }
        */
    }
})();