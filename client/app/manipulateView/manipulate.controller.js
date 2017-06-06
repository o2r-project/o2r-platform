(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ManipulateController', ManipulateController);
    
    ManipulateController.$inject = ['$scope', '$log', 'examine'];
    function ManipulateController($scope, $log, examine){
        var manipulate = examine;
        
        var vm = this;
        vm.selectedTab = 0;
        vm.interactive = {};
        vm.interactive.path = manipulate.metadata.o2r.shiny_app;
        vm.interactive.type = 'text/shiny';
        vm.interactive.name = 'mjomeiAnalysis2';
        vm.activateCodeData = () => $scope.$parent.vm.activateMCodeData();
        $log.debug(manipulate);
        $log.debug($scope);

        $scope.$on('$destroy', function(){
            $scope.$parent.vm.resetMCodeData();
        });

        $scope.$watch('vm.selectedTab', function(newVal, oldVal){
            $log.debug('Tab changed to object: %s', newVal);
            var newObj = {};
            newObj.code = [];
            newObj.data = [];
            newObj.code.push({
                path: manipulate.metadata.o2r.file.filepath,
                type: manipulate.metadata.o2r.file.mimetype,
                name: manipulate.metadata.o2r.file.filename
            });
            newObj.data.push(manipulate.metadata.o2r.inputfiles[newVal]);
            $scope.$parent.vm.mSetCodeData(newObj);
        });
        //dummy stuff
        vm.figures = [];
        vm.figures.push(vm.interactive);
        vm.figures.push(vm.interactive);
        vm.figures.push(vm.interactive);


        /////////////////

    }
})()