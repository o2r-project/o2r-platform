(function(){
	'use strict';

	angular
		.module('starter')
		.factory('metadata', metadata);
		
	metadata.$inject = ['$http', '$rootScope','$q', '$log', 'httpRequests', 'ngProgressFactory'];
	
	function metadata($http, $rootScope, $q, $log, httpRequests, ngProgressFactory){
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
		function callMetadata_search(searchTerm){
			var query = searchTerm || '*';
			var deferred = $q.defer();
			var progressbar = ngProgressFactory.createInstance();
				progressbar.setHeight('3px');
				progressbar.start();
			httpRequests
				.searchComp(query, 0)
				.then(cb1)
				.catch(errorHandler);
			return deferred.promise;

			function cb1(response){
				$log.debug('result of search: %o', response);
				deferred.resolve(response);
				progressbar.complete();
			}

			function errorHandler(e){
				$log.debug('search error: %o', e);
				deferred.resolve(e);
				progressbar.complete();
			}
		}
	}
})();