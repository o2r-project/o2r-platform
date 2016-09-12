(function(){
	'use strict';

	angular
		.module('starter')
		.factory('httpRequests', httpRequests);
		
	httpRequests.$inject = ['$http', 'url'];
		
	function httpRequests($http, url){
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
		* @Param callback, function which will be called on response
		*/
		function listCompendia(query, callback){
			var _url= url + '/compendium';
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
			$http.get(_url).then(function(response){
				callback(response);
			});
		}

		/*
		* @Desc httpRequest for retrieving a single compendium
		* @Param id, id of requested compendium
		* @Param callback, function which will be called on response
		*/
		function singleCompendium(id, callback){
			var _url = url + '/compendium/' + id;
			$http.get(_url).then(function(response){
				callback(response);
			});
		}

		/*
		* @Desc httpRequest for retrieving a list of related jobs of a single compendium
		* @Param id, id of compendium
		* @Param callback, function which will be called on response
		*/
		function listRelatedJobs(id, callback){
			var _url = url + '/compendium/' + id + '/jobs';
			$http.get(_url).then(function(response){
				callback(response);
			});
		}	

		/*
		* @Desc httpRequest for executing a new job
		* @Param body, object with attribute compendium_id, steps, inputs
		*              attribute compendium_id is required
		* @Param callback, function which will be called on response
		*/
		function newJob(body, callback){
			var _url = url + '/job';
			$http.post(_url, body).then(function(response){
				callback(response);
			});
		}


		/*
		* @Desc httpRequest for retrieving a list of jobs
		* @Param query, object with attributes compendium_id, start, limit
		* @Param callback, function which will be called on response
		*/
		function listJobs(query, callback){
			var _url = url + '/job';
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
			$http.get(_url)
				.success(function(data){
					callback(data);
				})
				.error(function(error, status){
					callback(error);
				});
		}

		/*
		* @Desc httpRequest for retrieving a single job
		* @Param id, id of job
		* @Param callback, function which will be called on response
		*/
		function listSingleJob(id, callback){
			var _url = url + '/job/' + id;
			$http.get(_url)
				.success(function (data){
					callback(data);
				});
		}

		function getLoggedUser(callback){
			var _url = url + '/auth/whoami';
			$http.get(_url).then(function(response){
				callback(response.data);
			}, function(response){
				console.log(response);
			});
		}
	};
})();