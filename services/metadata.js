"use strict";

app.factory('metadata', ['$http', '$rootScope', 'httpRequests', 'url', function($http, $rootScope, httpRequests, url){
	// contains all metadata from all requested compendia
	var comp_meta = [];
	
	// getter method for comp_meta
	var getComp_meta = function(){
		return comp_meta;
	};

	// searches for one specific compendium in comp_meta and returns it
	var getOneComp = function(id){
		var res;
		for(var index in comp_meta){
			if (comp_meta[index].id == id) res = comp_meta[index];
		}
		return res;
	};

	// returns last added compendium in comp_meta
	// comp_meta should be sorted by date
	var getLatestComp = function(){
		return comp_meta[comp_meta.length-1];
	};

	// httpRequest for Metadata of all compendia of one author
	// calls getMeta_author() for sending results to AuthorCtrl
	// calls initMetadataCtrl() for sending results to MetadataCtrl
	var callMetadata_author = function(authorid, callback){
		var counter = 0;
		comp_meta = [];
		httpRequests.listCompendia({'author': authorid}, function(response){
			for(var index in response.data.results){
				httpRequests.singleCompendium(response.data.results[index], function(res){
					comp_meta.push(res.data);
					counter += 1;
					if(counter == response.data.results.length){
						callback(getComp_meta());
						$rootScope.$broadcast('loadedAllComps');
					}
				});
			}
		});
	};

	var callMetadata_search = function(){
		//TODO
	};
	// httpRequest for Metadata of one job
	// calls getJobMeta() for sending data to MetadataCtrl
	var callJobStatus = function(id, callback){
		httpRequests.listJobs({'compendium_id': id}, function(response){
			if(typeof response === 'string'){
				callback(response);
			} else{
				var jobId = response.results[response.results.length-1];
				httpRequests.listSingleJob(jobId, function(res){
					callback(res);
				});
			}
		});

	};

	// id of last clicked compendium
	var comp_id = '';

	// setter method for comp_id
	var setComp_id = function(value){
		comp_id = value;
		$rootScope.$broadcast('changedComp_id', comp_id);
	};


	return{
		setComp_id: setComp_id,
		getComp_meta: getComp_meta,
		getOneComp: getOneComp,
		getLatestComp: getLatestComp,
		callJobStatus: callJobStatus,
		callMetadata_author: callMetadata_author,
		callMetadata_search: callMetadata_search
	};
}]);