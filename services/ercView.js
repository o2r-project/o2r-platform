'use strict';
app.factory('ercView', ['$rootScope', 'httpRequests', function($rootScope, httpRequests){
	var executionStatus = {};
	var jobDone = true;

	/*
	* @Desc checks type of file to be displayed
	* @Param string, MIME type of file
	* @Return result, true if highlightjs should be used, false otherwise
	*/
	var checkDisplayType = function(string){
        if(typeof string == 'undefined'){ return; }
        var result = true;
        var _mime = string.split('/')[0];
        if( (string == 'application/pdf') || (_mime == 'image') || (_mime == 'audio') || (_mime == 'video')){
            result = false;
        }
        return result;
    };

    /*
    * @Desc httpRequest for getting information about a job status
    * @Param id, id of compendium
    */
    var callJobs = function(id){
	    httpRequests.listJobs({'compendium_id': id}, function(response){
	        if(response.error){
	            setExecStatus({'Information': {'status': 'No jobs executed yet'}});
                setJobDone(false);
	        } else {
	            httpRequests.listSingleJob(response.results[response.results.length-1], function(res){
	                getJobStatus(res.steps);
	            });
	        }
	    });
    };

    /*
    * @Desc getting job status and checking if execution succeeded or failed
    * @Param status, object containing status information
    */
    var getJobStatus = function(status){
        var _checkStatus = function(object){
            var allSuccess = true;
            var oneFail = false;
            for(var step in object){
                if(object[step].status != 'success') allSuccess = false;
                if(object[step].status == 'failure') oneFail = true;
            }
            if(allSuccess) return true;
            if(oneFail) return true;
            return false;
        };
        setExecStatus(status);
        if(_checkStatus(status)){
            setJobDone(true);
        } else {
            setJobDone(false);
        }
    };

    /*
    * @Desc executes a new job
    * @Param id, id of compendium
    */
    var executeJob = function(id){
        httpRequests.newJob({'compendium_id': id}, function(response){
            httpRequests.listSingleJob(response.data.job_id, function(res){
                getJobStatus(res.steps);
            });
        });
    };


    var getExecStatus = function(){
    	return executionStatus;
    };

    var getJobDone = function(){
    	return jobDone;
    };

    var setExecStatus = function(status){
    	executionStatus = status;
    	$rootScope.$broadcast('changedExecStatus');
    };

    var setJobDone = function(bool){
    	jobDone = bool;
    	$rootScope.$broadcast('changedJobDone');
    };

    return{
    	checkDisplayType: checkDisplayType,
    	callJobs: callJobs,
    	getJobStatus: getJobStatus,
    	executeJob: executeJob,
    	getExecStatus: getExecStatus,
    	getJobDone: getJobDone
    };
}]);