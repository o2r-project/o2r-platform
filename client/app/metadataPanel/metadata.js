(function(){
	'use strict';

	angular
		.module('starter')
		.factory('metadata', metadata);
		
	metadata.$inject = ['$http', '$rootScope','$q', '$log', 'httpRequests'];
	
	function metadata($http, $rootScope, $q, $log, httpRequests){
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
		function callMetadata_author(authorid){
			var counter = 0;
			var deferred = $q.defer();
			comp_meta = [];
			httpRequests
				.listCompendia({'author': authorid})
				.then(cb1)
				.catch(errorHandler);
			
			return deferred.promise;
			
			function cb1(response){
				for(var index in response.data.results){
					$log.debug('callMetadata_author, cb1 %o', response);
					httpRequests
						.singleCompendium(response.data.results[index])
						.then(cb2)
						.catch(errorHandler);
				}
				function cb2(res){
					comp_meta.push(res.data);
					counter ++;
					if(counter == response.data.results.length){
						sortByDate(comp_meta);
						$rootScope.$broadcast('loadedAllComps');
						deferred.resolve(comp_meta);
					}
				}
				
			}
			function errorHandler(e){
				$log.debug('callMetadata_author errorHandler: %o',e);
				deferred.resolve(e);
			}
		}

		function callMetadata_search(searchTerm){
			var query = searchTerm || '*';
			var deferred = $q.defer();
			comp_meta = [];
			httpRequests
				.searchComp(query)
				.then(cb1)
				.catch(errorHandler);
			return deferred.promise;

			function cb1(response){
				comp_meta = response.data.hits.hits;
				$log.debug('result of search: %o', response);
				deferred.resolve(response);
			}

			function errorHandler(e){
				$log.debug('search error: %o', e);
				deferred.resolve(e);
			}
			/*var counter = 0;
			var deferred = $q.defer();
			comp_meta = [];
			httpRequests
				.listCompendia(null)
				.then(cb1)
				.catch(errorHandler);
			
			return deferred.promise;
			
			function cb1(response){
				for(var index in response.data.results){
					$log.debug('callMetadata_search, cb1 %o', response);
					httpRequests
						.singleCompendium(response.data.results[index])
						.then(cb2)
						.catch(errorHandler);
				}
				function cb2(res){
					comp_meta.push(res.data);
					counter ++;
					if(counter == response.data.results.length){
						sortByDate(comp_meta);
						$rootScope.$broadcast('loadedAllComps');
						deferred.resolve(comp_meta);
					}
				}
				
			}
			function errorHandler(e){
				$log.debug('callMetadata_search errorHandler: %o',e);
				deferred.resolve(e);
			}
			*/
		}

		// httpRequest for Metadata of one job
		// calls getJobMeta() for sending data to MetadataCtrl
		function callJobStatus(id){
			var deferred = $q.defer();
			httpRequests
				.listJobs({'compendium_id': id})
				.then(callback1)
				.then(callback2)
				.catch(errorHandler);

			return deferred.promise;

			function callback1(joblist){
				$log.debug('callJobStatus callback1: %o', joblist);
				var jobId = joblist.data.results[joblist.data.results.length-1];
				return httpRequests.listSingleJob(jobId);
			}
			function callback2(response){
				$log.debug('callJobStatus callback2: %o', response);
				deferred.resolve(response);
			}
			function errorHandler(e){
				$log.debug('callJobStatus errorHandler: %o', e);
				deferred.resolve({data: 'No analysis executed yet.'});
			}
		}

		// setter method for comp_id
		function setComp_id(value){
			comp_id = value;
			$rootScope.$broadcast('changedComp_id', comp_id);
		}
	}
})();