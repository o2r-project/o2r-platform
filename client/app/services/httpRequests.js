(function(){
	'use strict';

	angular
		.module('starter')
		.factory('httpRequests', httpRequests);
		
	httpRequests.$inject = ['$http', 'env'];
		
	function httpRequests($http, env){
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
			ercInZenodo: ercInZenodo
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
				if(typeof query.limit !== 'undefined') {
					_url += param + 'limit=' + query.limit;
					param = '&';
				}
				if(typeof query.start !== 'undefined') {
					_url += param + 'start=' + query.start;
					param = '&';
				}
				if(typeof query.author !== 'undefined') {
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
				if(typeof query.compendium_id !== 'undefined'){
					_url += param + 'compendium_id=' + query.compendium_id;
					param = '&';
				}
				if(typeof query.limit !== 'undefined'){
					_url += param + 'limit=' + query.limit;
					param = '&';
				}
				if(typeof query.start !== 'undefined'){
					_url += param + 'start=' + query.start;
					param = '&';
				}
				if(typeof query.status !== 'undefined'){
					_url += param + 'status=' + query.status;
					param = '&';
				}
			}
			console.log('calling listJobs with %s', _url);
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
		function searchComp(query){
			var _url = env.api + '/search?size=100&from=0&q=';
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

		function toZenodo(compendiumID){
			//$http.post("http://o2r.uni-muenster.de/api/v1/shipment", {compendium_id:compendiumID, recipient:"zenodo"});
			window.open("http://o2r.uni-muenster.de/api/v1/shipment?compendium_id="+compendiumID +"&recipient=zenodo");		
		}
	};
})();