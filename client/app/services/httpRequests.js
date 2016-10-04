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
			getLoggedUser: getLoggedUser
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
		* @Param query, object with attributes compendium_id, start, limit
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
			}
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
	};
})();