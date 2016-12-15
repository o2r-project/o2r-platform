(function(){
	'use strict';

	angular
		.module('starter')
		.factory('metadata', metadata);
		
	metadata.$inject = ['$http', '$rootScope','$q', '$log', 'httpRequests'];
	
	function metadata($http, $rootScope, $q, $log, httpRequests){
		var service = {
			callMetadata_author: callMetadata_author,
			callMetadata_search: callMetadata_search
		};

		return service;

		///////////

		function sortByDate(array){
			array.sort(function(a,b){
				return new Date(a.created).getTime() - new Date(b.created).getTime();
			});
		}

		// httpRequest for Metadata of all compendia of one author
		function callMetadata_author(authorid){
			var counter = 0;
			var deferred = $q.defer();
			var comp_meta = [];
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
						$rootScope.$broadcast('loadedAllComps', comp_meta);
						deferred.resolve(comp_meta);
					}
				}
				
			}
			function errorHandler(e){
				$log.debug('callMetadata_author errorHandler: %o',e);
				deferred.resolve(e);
			}
		}

		// httpRequest for Metadata of all compendia matching a search query
		function callMetadata_search(searchTerm, startIndex, tempResults){
			var query = searchTerm || '*';
			startIndex==undefined ? startIndex=0 : null;
			var deferred = $q.defer();
			httpRequests
				.searchComp(query,startIndex)
				.then(cb1)
				.catch(errorHandler);
			return deferred.promise;
			
			function cb1(response){
				
				$log.debug('result of search: %o', response);		
				tempResults==undefined ? tempResults=response : response.data.hits.hits = tempResults.data.hits.hits.concat(response.data.hits.hits);
				if (response.data.hits.hits.length < response.data.hits.total){
					startIndex+=10; 
					callMetadata_search(searchTerm, startIndex, response);
					deferred.resolve(response);
					
				}else{
					console.log("ende")
										
				} 	
			}

			function errorHandler(e){
				$log.debug('search error: %o', e);
				deferred.resolve(e);
			}
		}
	}
})();