(function () {
    'use strict';

    angular
        .module('starter')
        .controller('CompareAnalysisController', CompareAnalysisController);

    CompareAnalysisController.$inject = ['$scope', '$stateParams', '$log', '$mdDialog', 'env', 'icons', 'jobs', 'httpRequests', 'compendium'];
    function CompareAnalysisController($scope, $stateParams, $log, $mdDialog, env, icons, jobs, httpRequests, compendium) {
        var logger = $log.getInstance('compareAnalysisCtrl');
        var vm = this;
        vm.icons = icons;
        vm.original = {};

        var currentCompendium = compendium.getCompendium();
        
        vm.original.path = $stateParams.o || env.api + '/compendium/' + $stateParams.ercid + '/data/' + currentCompendium.metadata.o2r.displayfile;
        vm.original.type = $stateParams.om || 'text/html';

        var jobId = jobs.getLastFinishedJobId();
        logger.info("Using last finished job", jobId);
        httpRequests.listSingleJob(jobId).then((jobMetadata) => {
            vm.reproduced = {};
            vm.reproduced.path = $stateParams.r || env.api + '/job/' + jobId + '/data/' + currentCompendium.metadata.o2r.displayfile;
            vm.reproduced.type = $stateParams.rm || 'text/html';
            vm.difference = {};
            vm.check = jobMetadata.data.steps.check;
            vm.difference.path = $stateParams.d || env.api + '/job/' + jobId + '/data/diffHTML.html';
            vm.difference.type = $stateParams.dm || 'text/html';
            vm.cancel = cancel;
            logger.info('compareAnalysisView  loaded with params:', $stateParams);
        });

        /////

        function cancel() {
            $mdDialog.cancel();
        }
    }
})()