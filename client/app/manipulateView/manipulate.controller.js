(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ManipulateController', ManipulateController);
    
    ManipulateController.$inject = ['$scope', '$log', 'erc'];
    function ManipulateController($scope, $log, erc){
        var manipulate = erc;
        
        var vm = this;
        vm.selectedTab = 0;
        vm.interactive = {};
        vm.interactive.path = manipulate.metadata.o2r.shiny_app;
        vm.interactive.type = 'text/shiny';
        vm.interactive.name = 'mjomeiAnalysis2';
        vm.activateCodeData = () => $scope.$parent.vm.activateMCodeData();
        $log.debug(manipulate);

        $scope.$on('$destroy', function(){
            $scope.$parent.vm.resetMCodeData();
        });

        $scope.$watch('vm.selectedTab', function(newVal, oldVal){
            $log.debug('Tab changed to object: %s', newVal);
            //TODO
            //Rewrite this part with real paths to code and data as soon as metadata contains this information
            var newObj = {};
            newObj.code = [];
            newObj.data = [];
            newObj.code.push({
                path: manipulate.metadata.o2r.file.filepath,
                type: manipulate.metadata.o2r.file.mimetype,
                name: manipulate.metadata.o2r.file.filename
            });
            if(newVal == 1){
                newObj.code.push({
                    path: manipulate.metadata.o2r.file.filepath,
                    type: manipulate.metadata.o2r.file.mimetype,
                    name: manipulate.metadata.o2r.file.filename
                });
            }
            newObj.data.push(manipulate.metadata.o2r.inputfiles[newVal]);
            newObj.data.push(manipulate.metadata.o2r.inputfiles[0]);
            $scope.$parent.vm.mSetCodeData(newObj);
        });
        //dummy stuff
        vm.figures = [];
        vm.figures.push(vm.interactive);
        vm.figures.push(vm.interactive);
        vm.figures.push(vm.interactive);
        vm.figures.push(vm.interactive);
        vm.figures.push(vm.interactive);
        vm.figures.push(vm.interactive);


        /////////////////

    }
})()