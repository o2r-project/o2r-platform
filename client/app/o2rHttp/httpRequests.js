(function(){
	'use strict';

	angular
		.module('starter.o2rHttp')
		.factory('httpRequests', httpRequests);
		
	httpRequests.$inject = ['$http', '$log', '$q', 'env'];
		
	function httpRequests($http, $log, $q, env){
		var service = {
			listCompendia : listCompendia,
			singleCompendium: singleCompendium,
			listRelatedJobs: listRelatedJobs,
			newJob: newJob,
			listJobs: listJobs,
			listSingleJob: listSingleJob,
			getLoggedUser: getLoggedUser,
			getSingleUser: getSingleUser,
			searchComp: searchComp,
			// toZenodo: toZenodo,
			getAllShipments: getAllShipments,
			getCompShipments: getCompShipments,
			getShipment: getShipment,
			newShipment: newShipment,
			getStatus: getStatus,
			publishERC: publishERC,
			deleteFileFromDepot: deleteFileFromDepot,
			getRecipient: getRecipient,
			updateMetadata: updateMetadata,
			uploadViaSciebo: uploadViaSciebo,
			getLicenses: getLicenses,
			setUserLevel: setUserLevel,
			getAllUsers: getAllUsers,
			deleteCompendium: deleteCompendium
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

		/*
		* @Desc httpRequest for retrieving information of a single user
		* @Param orcid, String containing an orcid
		*/
		function getSingleUser(orcid){
			var _url = env.api + '/user/' + orcid;
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

		function uploadViaSciebo(url, path){
			var _url = env.api + '/compendium/';		
			return $http.post(_url, {content_type:"compendium", share_url:url, path:"/"+path});	
		}

		// function toZenodo(compendiumID) {
		// 	var _url = env.api + '/shipment';
		// 	return $http.post(_url, "compendium_id=" + compendiumID + "&recipient=" + "zenodo")		
		// }

		/**
		 * Retrieve all shipments
		 */
		function getAllShipments(){
			var _url = env.api + '/shipment';
			return $http.get(_url);
		}

		/**
		 * Retrieve all shipments belonging to a specific compendium
		 * @param {String} compendiumID 
		 */
		function getCompShipments(compendiumID){
			var _url = env.api + '/shipment?compendium_id=' + compendiumID;			
			return $http.get(_url);
		}	

		/**
		 * Retrieve one specific shipment with id shipmentID
		 * @param {String} shipmentID 
		 */
		function getShipment(shipmentID){
			var _url = env.api + '/shipment/' + shipmentID;
			return $http.get(_url);
		}

		/**
		 * Creates a new shipment
		 * @param {String} compId 
		 * @param {String} recipient 
		 * @param {Boolean} update_packaging 
		 * @param {String} shipment_id 
		 */
		function newShipment(compId, recipient, update_packaging, shipment_id){
			var _url = env.api + '/shipment';
			var body = {compendium_id: compId, recipient: recipient};
			if(update_packaging) body.update_packaging = update_packaging;
			if(shipment_id) body.shipment_id = shipment_id;
			return $http.post(_url, body);
		}

		function getStatus(shipmentID){
			var _url = env.api + '/shipment/' + shipmentID + '/status';
			return $http.get(_url);
		}

		function publishERC(shipmentID){
			var _url = env.api + '/shipment/' + shipmentID + '/publishment';
			return $http.put(_url,{});			
		}

		function deleteFileFromDepot(shipment_id, file_id){
			var _url = env.api + '/shipment/' + shipment_id + '/files/' + file_id;
			return $http.delete(_url);
		}

		function getRecipient(){
			var _url = env.api + '/recipient';
			return $http.get(_url);
		}

		function updateMetadata(id, data){
			var _url = env.api + '/compendium/' + id + '/metadata';
			var body = {o2r: data};
			return $http.put(_url, body);
		}

		function getLicenses(){
			return $http.get("http://licenses.opendefinition.org/licenses/groups/all.json");
		}

		/**
		 * @desc set level of user
		 * @param {string} id, id of user whose level should be set
		 * @param {integer} level, new level that should be set for user
		 */
		function setUserLevel(id, level){
			var _url = env.api + '/user/' + id + '?level=' + level;
			return $http.patch(_url);
		}

		/**
		 * @desc gets information of all users
		 * @return array of user objects
		 */
		function getAllUsers(){
			var result = [];
			var counter = 0;
			var _url = env.api + '/user/';
			var deferred = $q.defer();
			$http.get(_url)
				.then(cb)
				.catch(function(e){
					deferred.reject(e);
				});
			
			return deferred.promise;
			
			function cb(res){
				for(var i in res.data.results){
					var _url2 = _url + res.data.results[i];
					$http.get(_url2)
						.then(function(r){
							result.push(r.data);
							counter++;	
							if(counter == res.data.results.length){
								deferred.resolve(result);
							}
						});
				}
			}
		}

		function deleteCompendium(compId){
			var _url = env.api + '/compendium/' + compId;
			return $http.delete(_url);
		}
	};
})();