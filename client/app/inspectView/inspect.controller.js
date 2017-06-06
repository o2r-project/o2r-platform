(function(){
    'use strict';

    angular
        .module('starter')
        .controller('InspectController', InspectController);
    
    InspectController.$inject = ['$scope', '$log','examine'];
    function InspectController($scope, $log, examine){
        var inspect = examine;
        
        var vm = this;
        vm.inspectData = {};
        vm.inspectData.publication = inspect;
        vm.inspectData.data = inspect.metadata.o2r.inputfiles;
        vm.inspectData.code = [];
        vm.inspectData.code.push({
            path: inspect.metadata.o2r.file.filepath,
            name: inspect.metadata.o2r.file.filename,
            type: inspect.metadata.o2r.file.mimetype
        });
        
    }
})()