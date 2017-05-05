(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ExamineController', ExamineController);

    ExamineController.$inject = ['$scope', '$stateParams', '$log', '$state', 'examine', 'publications'];
    function ExamineController($scope, $stateParams, $log, $state, examine, publications){
        var vm = this;
        vm.methods = {
            inspect: 'Inspect',
            compare: 'Compare'
        };
        vm.compare = {
            analysis: 'Analysis',
            substitution: 'Substitution',
            manipulation: 'Manipulation',
            localfiles: 'LocalFiles'
        };
        vm.method = vm.methods.compare;
        vm.comparemethod = vm.compare.localfiles;
        vm.publication = examine;
        vm.toCompare;
        vm.file = publications.getContentById(vm.publication, fixPath(vm.publication.metadata.o2r.file.filepath));
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };
        vm.setCompare = setCompare;
        vm.compareaction = compareaction;


        $log.debug(vm.publication);
        $log.debug(vm.file);
        /////

        function fixPath(path){
            var str = '/data/';
            path = '/api/v1/compendium/' + path;
            var newPath = path.replace(str, str+'data/');
            $log.debug('fixed path is: %s', newPath);
            return newPath;
        }

        function setCompare(path){
            var p = publications.getContentById(vm.publication, path);
            var isEmpty = true;
            for(var att in p){
                isEmpty = false;
            }
            if (isEmpty){
                $log.debug('clicked on folder');
                return;
            }
            vm.toCompare = p;
        }   

        function compareaction(){
            if((vm.method == vm.methods.compare) && (vm.comparemethod == vm.compare.localfiles) && (vm.toCompare)){
                $state.go('compare', {left: vm.file.path, right: vm.toCompare.path, lmime: vm.file.type, rmime: vm.toCompare.type});
            }
        }
    }
}
)();