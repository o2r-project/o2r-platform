(function(){
    'use strict';

    angular
        .module('starter')
        .factory('jobs', jobs);
        
    jobs.$inject = ['$rootScope', '$log', '$q', 'httpRequests', 'ngProgressFactory'];
    
    function jobs($rootScope, $log, $q, httpRequests, ngProgressFactory){
        var executionStatus = {};
        var jobDone = true;

        var service = {
            callJobs: callJobs,
            checkStatus: checkStatus,
            executeJob: executeJob,
            getExecStatus: getExecStatus,
            getJobDone: getJobDone
        };

        return service;

        /////////////

        /*
        * @Desc httpRequest for getting information about a job status
        * @Param query, object containing query information for httpRequest
        */
        function callJobs(query){
            var deferred = $q.defer();
            httpRequests
                .listJobs(query)
                .then(callback1)
                .then(callback2)
                .catch(errorHandler);
            
            return deferred.promise;

            function callback1(joblist){
                $log.debug('in callJobs callback1: %o', joblist);
                return httpRequests.listSingleJob(joblist.data.results[joblist.data.results.length-1]);
            }
            function callback2(job){
                $log.debug('in callJobs callback2: %o', job);
                setExecStatus(job.data.steps);
                setJobDone(checkStatus(job.data.steps));
                deferred.resolve(job);
            }
            function errorHandler(e){
                $log.debug('in callJobs errorHandler: %o', e);
                //overwrite execStatus with empty object
                setExecStatus({});
                setJobDone(true);
                deferred.resolve({data: 'No analysis executed yet.'});
            }
        }

        /*
        * @Desc getting job status and checking if execution succeeded or failed
        * @Param status, object containing status information
        */
        function checkStatus(object){
            var status = ['success', 'failure', 'running'];
            var allSuccess = true;
            var oneFail = false;
            for(var step in object){
                if(object[step].status != 'success') allSuccess = false;
                if(object[step].status == 'failure') oneFail = true;
            }
            if(allSuccess) return status[0];
            if(oneFail) return status[1];
            return status[2];
        }

        /*
        * @Desc executes a new job
        * @Param id, id of compendium
        */
        function executeJob(id){
            $rootScope.progressbar = ngProgressFactory.createInstance();
			$rootScope.progressbar.setHeight('3px');
			$rootScope.progressbar.start();
			//$timeout($rootScope.progressbar.complete(),100);            
            var deferred = $q.defer();
            httpRequests.newJob({'compendium_id': id})
                .then(callback1)
                .then(callback2)
                .catch(errorHandler);

            return deferred.promise;
            
            function callback1(response){
                $log.debug('executeJob callback1: %o', response);
                return httpRequests.listSingleJob(response.data.job_id);
                //(res) => {getJobStatus(res.steps);});
            }
            function callback2(job){
                $log.debug('executeJob callback2: %o', job);
                setJobDone(checkStatus(job.data.steps));
                deferred.resolve(job);
            }
            function errorHandler(e){
                $log.debug('executeJob errorHandler: %o', e);
                $rootScope.progressbar.complete();
                deferred.resolve(e);
            }
        }


        function getExecStatus(){
            return executionStatus;
        }

        function getJobDone(){
            return jobDone;
        }

        function setExecStatus(status){
            executionStatus = status;
            $rootScope.$broadcast('changedExecStatus');
        }

        function setJobDone(bool){
            jobDone = bool;
            $rootScope.$broadcast('changedJobDone');
        }
    }
})();