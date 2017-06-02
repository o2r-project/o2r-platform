(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ExamineSidenavController', ExamineSidenavController);
    
    ExamineSidenavController.$inject = ['$scope', '$log', 'publications', 'icons'];
    function ExamineSidenavController($scope, $log, publications, icons){
        var vm = this;
        vm.icons = icons;
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };
        vm.publication = prepareFiles($scope.$parent.vm.publication);
        vm.setOne = setOne;
        vm.bagitToggle = bagitToggle;
        vm.showBagit = false;
        vm.ercId = $scope.$parent.vm.publication.id;

        $log.debug(vm);
        $log.debug($scope);

        //////

        function prepareFiles(obj){
            //uncomment line below to not add shiny to every erc
            //if(obj.metadata.o2r.interaction.interactive == true){
                // TODO
                //delete this when backend added interaction.path
                //obj.metadata.o2r.interaction.path = 'https://markuskonkol.shinyapps.io/main/';
                $log.debug('preparing files');
                obj.metadata.o2r.interaction.path = 'https://markuskonkol.shinyapps.io/mjomeiAnalysis2/'
                var name = obj.metadata.o2r.file.filename.split('.');
                var name = name[0] + '_interactive';
                var dummy = {
                    extension: null,
                    name: name,
                    path: obj.metadata.o2r.interaction.path,
                    size: 368,
                    type: 'text/shiny'
                };
                // TODO 
                // substitute second parameter with obj.metadata.o2r.file.filepath
                obj = publications.addInteractive(obj, '/api/v1/compendium/' + obj.id + '/data/data', dummy);
                $log.debug(obj);
            //}
            return obj;
        }

        function setOne(path){
            var p = publications.getContentById(vm.publication, path);
            $log.debug('clicked on file: ', p);
            var isEmpty = true;
            for(var att in p){
                isEmpty = false;
            }
            if (isEmpty){
                $log.debug('clicked on folder');
                return;
            }
            $scope.$parent.vm.file = p;
            $scope.$parent.vm.checkForOriginal();
        }

        /*
        * TODO:
        * rewrite function so that bagit files will be excluded
        * right now only 'data' folder is included. But this could cause problems, if the data directoy gets another name
        */
        function bagitToggle(files, hide){
            if(!hide) {
                var unhidden = {};
                for(var i in files.children){
                    if(files.children[i].name == 'data'){
                        var unhidden = files.children[i];
                    }
                }
                return unhidden;
            }
            return files;
        }
    }
})();