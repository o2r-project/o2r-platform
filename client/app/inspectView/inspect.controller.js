(function(){
    'use strict';

    angular
        .module('starter')
        .controller('InspectController', InspectController);
    
    InspectController.$inject = ['$scope', '$log', 'publications', 'icons', 'examine'];
    function InspectController($scope, $log, publications, icons, examine){
        var inspect = examine;
        
        var vm = this;
        vm.icons = icons;
        vm.datasets = prepareDatasets(inspect.metadata.o2r.inputfiles);
        vm.selectedData = vm.datasets[2];

        vm.code = {};
        vm.code.path = prepareCode(inspect.metadata.o2r.file.filepath);
        vm.code.type = inspect.metadata.o2r.file.mimetype;
        vm.code.name = inspect.metadata.o2r.file.filename;

        vm.openMenu = openMenu;

        vm.selectData = selectData;
        
        $log.debug(vm);
        ///////

        /**
         * 
         * @param {Array} dsets , array containing all input files
         */
        function prepareDatasets(dsets){
            var regex = '/tmp/o2r/compendium/' + inspect.id;
            var results = [];
            for(var i in dsets){
                results.push(publications.getContentById(inspect, dsets[i].replace(regex, '/api/v1/compendium/' + inspect.id + '/data')));
            }
            return results;
        }

        function prepareCode(code){
            var regex = inspect.id;
            return code.replace(regex, '/api/v1/compendium/' + inspect.id + '/data');
        }

        function openMenu($mdMenu, ev){
            $mdMenu.open(ev);
        }

        function selectData(item){
            $log.debug('selected %o', item);
            vm.selectedData = item;
        }
    }
})()