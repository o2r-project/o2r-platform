(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ErcCtrl', ErcCtrl);

    ErcCtrl.$inject = ['$scope', '$stateParams','publications', 'ercView', 'httpRequests', 'url', 'sizeRestriction'];

    function ErcCtrl($scope, $stateParams, publications, ercView, httpRequests, url, sizeRestriction){
        var vm = this;
        var ercId = $stateParams.ercid; // id of compendium
        
        vm.sizeRestrict = sizeRestriction;
        vm.fileId; // id of file in publication
        vm.setId = setId;
        vm.execJob = ex;
        vm.execStatus = ercView.getExecStatus();
        vm.jobDone = true;
        vm.treeOptions = {  // options for folderTree
            nodeChildren: 'children',
            dirSelectable: false
        };

        publications.getRequest(ercId, callback); // httpRequest for retrieving all metadata of a compendium
        ercView.callJobs(ercId); // getting job status
        
        $scope.$on('changedExecStatus', function(){
            vm.execStatus = ercView.getExecStatus();
        });
        $scope.$on('changedJobDone', function(){
            vm.jobDone = ercView.getJobDone();
        });

        ///////////////
        
        function callback(){
            vm.publication = publications.getPublications();
            vm.getOne = function(path){
                var p = publications.getContentById(path);
                return p;
            };
            // checks for filesize and mimetype for displaying content of files
            // returns true, if file is not too big and not of type of pdf, image, audio, video
            vm.displaySource = function(string){
                return ercView.checkDisplayType(string);
            };
        }
        function setId(path){  // set fileId
            vm.fileId = path;
        }

        function ex(){
            ercView.executeJob(ercId);
        }
    }
})();

