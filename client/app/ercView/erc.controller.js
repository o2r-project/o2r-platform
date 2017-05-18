(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcController', ErcController);

    ErcController.$inject = ['$scope', '$stateParams','$log', '$mdDialog', 'publications', 'jobs', 'compInfo', 'compFJob', 'compSJob', 'env', 'icons', 'header','socket', 'httpRequests', 'login', 'ngProgressFactory'];

    function ErcController($scope, $stateParams, $log, $mdDialog, publications, jobs, compInfo, compFJob, compSJob, env, icons, header, socket, httpRequests, login, ngProgressFactory){
        var vm = this;
        vm.fJob = compFJob.data;
        vm.sJob = compSJob.data;
        vm.icons = icons;
        vm.ercId = $stateParams.ercid; // id of compendium
        vm.publication = prepareFiles(compInfo);
        vm.oneFile; // one file in publication
        vm.setOne = setOne;
        vm.server = env.server;
        vm.isEmpty = isEmpty;
        vm.showBagit = false;
        vm.bagitToggle = bagitToggle;
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };
        vm.openMenu = function($mdOpenMenu, ev){
            $mdOpenMenu(ev);
        };

        vm.loggedIn = login.isLoggedIn();
        $scope.shipped = false;
        $scope.publish = true;
        
        httpRequests.getShipment(vm.ercId)
            .then(function (res){
                console.log(res);
                if(res.data.length > 0){ 
                    $scope.shipped=true;
                    httpRequests.getStatus(res.data[0])
                    .then(function (res2){
                        console.log(res2);
                        if (res2.data.status == "shipped"){
                             $scope.publish = false;
                        }
                        if (res2.data.status == "published"){
                            $scope.publish = true;
                        }    
                    })
                    .catch(function (err2){
                        $log.debug(err2);
                    })
                }
            })
            .catch(function (err){
                $log.debug(err);
            });
        
        vm.sendToZenodo = function(){
            var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('3px');
			progressbar.start();

            httpRequests.toZenodo(vm.ercId)
            .then(function (res) {
					$log.debug(res);
                    $scope.shipped=true;
                    $scope.publish=false;
                    progressbar.complete();
			})
            .catch(function (err){
                $log.debug(err);
            })     
        };

        vm.publishInZenodo = function(){
            httpRequests.getShipment(vm.ercId)
                .then(function (res){
                    httpRequests.publishERC(res.data[0])
                    .then(function (res2){
                        console.log("published")  
                        console.log(res2) 
                    })
                    .catch(function (err2){
                        $log.debug(err2);
                    })
                })
                .catch(function (err){
                    $log.debug(err);
                });
        };


        //To do:query to shipper api if ERC is already in zenodo
        
        $log.debug('ErcCtrl, publication: %o', vm.publication);

        activate();
        ///////////////
        
        function activate(){
            // publications.getRequest(vm.ercId); // httpRequest for retrieving all metadata of a compendium
            header.setTitle('o2r - Compendium');
            // TODO
            //use this, when backend fixes path to main file
            //vm.setOne('/api/v1/compendium/' + vm.publication.metadata.o2r.file.filepath);
            //delete this, when backend fixed path to main file
            vm.setOne('/api/v1/compendium/' + vm.publication.id + '/data/data/' + vm.publication.metadata.o2r.file.filename);
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
            vm.oneFile = p;
        }

        function isEmpty(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)) return false;
            }
            return true;
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

        function prepareFiles(obj){
            //uncomment line below to not add shiny to every erc
            //if(obj.metadata.o2r.interaction.interactive == true){
                // TODO
                //delete this when backend added interaction.path
                //obj.metadata.o2r.interaction.path = 'https://markuskonkol.shinyapps.io/main/';
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
    }
})();

