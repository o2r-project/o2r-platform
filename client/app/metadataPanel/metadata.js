(function(){
	'use strict';

	angular
		.module('starter')
		.factory('metadata', metadata);
		
	metadata.$inject = ['$http', '$rootScope', 'httpRequests', 'url'];
	
	function metadata($http, $rootScope, httpRequests, url){
		var comp_meta = []; // contains all metadata from all requested compendia
		var comp_id = ''; // id of last clicked compendium
		var service = {
			setComp_id: setComp_id,
			getComp_meta: getComp_meta,
			getOneComp: getOneComp,
			getLatestComp: getLatestComp,
			getFirstComp: getFirstComp,
			callJobStatus: callJobStatus,
			callMetadata_author: callMetadata_author,
			callMetadata_search: callMetadata_search
		};

		return service;

		///////////

		// getter method for comp_meta
		function getComp_meta(){
			return comp_meta;
		}

		// searches for one specific compendium in comp_meta and returns it
		function getOneComp(id){
			var res;
			for(var index in comp_meta){
				if (comp_meta[index].id == id) res = comp_meta[index];
			}
			return res;
		}

		// returns last added compendium in comp_meta
		// comp_meta should be sorted by date
		function getLatestComp(){
			return comp_meta[comp_meta.length-1];
		}

		function getFirstComp(){
			return comp_meta[0];
		}

		function sortByDate(array){
			array.sort(function(a,b){
				return new Date(a.created).getTime() - new Date(b.created).getTime();
			});
		}

		// httpRequest for Metadata of all compendia of one author
		// calls getMeta_author() for sending results to AuthorCtrl
		// calls initMetadataCtrl() for sending results to MetadataCtrl
		function callMetadata_author(authorid, callback){
			var counter = 0;
			comp_meta = [];
			httpRequests.listCompendia({'author': authorid}, cb);
			
			function cb(response){
				for(var index in response.data.results){
					httpRequests.singleCompendium(response.data.results[index], function(res){
						comp_meta.push(res.data);
						counter ++;
						if(counter == response.data.results.length){
							sortByDate(comp_meta);
							callback(getComp_meta());
							$rootScope.$broadcast('loadedAllComps');
						}
					});
				}
			}
		}

		function callMetadata_search(searchTerm, callback){
			var counter = 0;
			comp_meta = [];
			httpRequests.listCompendia(null, cb);
			
			function cb(response){
				for(var index in response.data.results){
					httpRequests.singleCompendium(response.data.results[index], function(res){
						comp_meta.push(res.data);
						counter++;
						if(counter == response.data.results.length){
							callback(getComp_meta());
							$rootScope.$broadcast('loadedAllComps');
						}
					});
				}
			}
		}

		// httpRequest for Metadata of one job
		// calls getJobMeta() for sending data to MetadataCtrl
		function callJobStatus(id, callback){
			httpRequests.listJobs({'compendium_id': id}, cb);
			
			function cb(response){
				if(response.error){
					callback('No jobs executed yet');
				} else{
					var jobId = response.results[response.results.length-1];
					httpRequests.listSingleJob(jobId, (res) => {callback(res);});
				}
			}

		}

		// setter method for comp_id
		function setComp_id(value){
			comp_id = value;
			$rootScope.$broadcast('changedComp_id', comp_id);
		}
	}
})();