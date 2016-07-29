"use strict";

app.factory('metadata', ['$http', '$rootScope', 'url', function($http, $rootScope, url){
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
		//real
		//$http.get(url + '/compendium?author=' + authorid)
		//test
		$http.get(url + '/compendium/')
			.then(function successCallback(response){
				for(var index in response.data.results){
					$http.get(url + '/compendium/' + response.data.results[index])
						.then(function successCallback(res){
							comp_meta.push(res.data);
							counter += 1;
							if(counter == response.data.results.length){
								callback(getComp_meta());
								$rootScope.$broadcast('loadedAllComps');
							}
						}, function errorCallback(res){
							console.log(res);
						});
				}
			}, function errorCallback(response){
				console.log(response);
			});
	};

	var callMetadata_search = function(){
		//TODO
	};
	// httpRequest for Metadata of one job
	// calls getJobMeta() for sending data to MetadataCtrl
	var callJobStatus = function(id, callback){
		$http.get(url + '/job?compendium_id=' + id)
			.then(function successCallback(response){
				var jobId = response.data.results[response.data.results.length-1];
				$http.get(url + '/job/' + jobId)
					.then(function successCallback(res){
						callback(res.data);
					}, function errorCallback(res){
						console.log(res);
					});
			}, function errorCallback(response){
				callback('No Jobs finished yet.');
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