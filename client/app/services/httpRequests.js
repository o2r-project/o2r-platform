(function(){
	'use strict';

	angular
		.module('starter')
		.factory('httpRequests', httpRequests);
		
	httpRequests.$inject = ['$http', '$log', 'env', '$window', '$q', 'ngProgressFactory', '$location'];
		
	function httpRequests($http, $log, env, $window, $q, ngProgressFactory, $location){
		var service = {
			listCompendia : listCompendia,
			singleCompendium: singleCompendium,
			listRelatedJobs: listRelatedJobs,
			newJob: newJob,
			listJobs: listJobs,
			listSingleJob: listSingleJob,
			getLoggedUser: getLoggedUser,
			searchComp: searchComp,
			toZenodo: toZenodo,
			ercInZenodo: ercInZenodo,
			updateMetadata: updateMetadata,
			uploadViaSciebo: uploadViaSciebo
		};

		return service;

		////////////////

		/*
		* @Desc httpRequest for retrieving a list of compendia
		* @Param query, object with attributes author, start and limit to define queries
		*/

		function listCompendia(query){
			var _url= env.api + '/compendium';
			var param = '?';

			if(query){
				if(angular.isDefined(query.limit)) {
					_url += param + 'limit=' + query.limit;
					param = '&';
				}
				if(angular.isDefined(query.start)) {
					_url += param + 'start=' + query.start;
					param = '&';
				}
				if(angular.isDefined(query.author)) {
					_url += param + 'user=' + query.author;
					param = '&';
				}
			}
			return $http.get(_url);
		}

		/*
		* @Desc httpRequest for retrieving a single compendium
		* @Param id, id of requested compendium
		*/
		function singleCompendium(id){
			var _url = env.api + '/compendium/' + id;
			return $http.get(_url);
		}

		/*
		* @Desc httpRequest for retrieving a list of related jobs of a single compendium
		* @Param id, id of compendium
		*/
		function listRelatedJobs(id){
			var _url = env.api + '/compendium/' + id + '/jobs';
			return $http.get(_url);
		}	

		/*
		* @Desc httpRequest for executing a new job
		* @Param body, object with attribute compendium_id, steps, inputs
		*              attribute compendium_id is required
		*/
		function newJob(body){
			var _url = env.api + '/job';
			return $http.post(_url, body);
		}


		/*
		* @Desc httpRequest for retrieving a list of jobs
		* @Param query, object with attributes compendium_id, start, limit, status
		*/
		function listJobs(query){
			var _url = env.api + '/job';
			var param = '?';
			if(query){
				if(angular.isDefined(query.compendium_id)){
					_url += param + 'compendium_id=' + query.compendium_id;
					param = '&';
				}
				if(angular.isDefined(query.limit)){
					_url += param + 'limit=' + query.limit;
					param = '&';
				}
				if(angular.isDefined(query.start)){
					_url += param + 'start=' + query.start;
					param = '&';
				}
				if(angular.isDefined(query.status)){
					_url += param + 'status=' + query.status;
					param = '&';
				}
			}
			$log.debug('calling listJobs with %s', _url);
			return $http.get(_url);
		}

		/*
		* @Desc httpRequest for retrieving a single job
		* @Param id, id of job
		*/
		function listSingleJob(id){
			var _url = env.api + '/job/' + id;
			return $http.get(_url);
		}

		/*
		* @Desc httpRequest for retrieving information of the logged in user
		*/
		function getLoggedUser(){
			var _url = env.api + '/auth/whoami';
			return $http.get(_url);
		}

		/**
		 * @Desc calling the elasticsearch api-endpoint for retrieving search results
		 * @Param query, String containing search term
		 */
		function searchComp(query, startIndex){
			var _url = env.api + '/search?size=100&from='+startIndex+'&q=';
			if(query) _url += query;
			else _url += '*';
			return $http.get(_url);
		}

		function ercInZenodo(compendiumID){
			var _url = env.api + '/shipment?compendium_id=' + compendiumID;			
			//Wait for server implementation
			//var shipment = $http.get(_url);
			//return shipment.status != "delivered";
			return true;
		}

		function uploadViaSciebo(url, path){
			var _url = 'http://localhost/api/v2/compendium/';			
			return $http.post(_url, {content_type:"compendium_v1", share_url:url, path:"/"+path});	
		}	

		function toZenodo(compendiumID) {
			var _url = env.api + '/shipment';
            var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('3px');
			progressbar.start();
			$http.post(_url, "compendium_id=" + encodeURIComponent(compendiumID) + "&recipient=" + encodeURIComponent("zenodo"))
				.then(function (response) {
					$log.debug(response);
					$window.open(_url + '/' + response.data.id);
					progressbar.complete();
					return "success";
				},
				function (response) {
					$log.debug(response);
				});		
		}

		function updateMetadata(id, data){
			var _url = env.api + '/compendium/' + id + '/metadata';
			var body = {o2r: data};
			return $http.put(_url, body);
		}
	};
})();