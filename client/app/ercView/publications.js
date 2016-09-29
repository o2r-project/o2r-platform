(function(){
	'use strict';

	angular
		.module('starter')
		.factory("publications", publications);
		
	publications.$inject = ['$q', 'httpRequests'];

	function publications($q, httpRequests){
		var publications;
		var pub = {};
		var service = {
			getPublications: get,
			getContentById: findContent,
			getRequest: getRequest
		};

		return service;

		////////////

		function getRequest(id){
			var deferred = $q.defer();
			httpRequests
				.singleCompendium(id)
				.then(callback)
				.catch(errorHandler);

			return deferred.promise;	

			function callback(response){
				console.log('getRequest callback: %o', response);
				publications = response.data;
				deferred.resolve(response.data);
			}
			function errorHandler(e){
				console.log('getRequest errorHandler: %o', e);
				deferred.resolve(e);
			}
		}

		function iterator(o, path){
			var object = o;
			var searchedFile = path;

			if(typeof object.children != 'undefined'){
				for(var content in object.children){
					iterator(object.children[content], searchedFile);
				}
			} else {
				if(object.path == searchedFile)	pub = object;
				return;
			}
		}

		function findContent(compendium, searchedFile){
			var searchedObject = {};
			iterator(compendium.files, searchedFile);
			searchedObject = pub;
			pub = {};
			return searchedObject;
		}

		function get(){
			return publications;
		}
	}
})();