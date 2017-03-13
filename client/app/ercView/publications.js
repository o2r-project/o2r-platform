(function(){
	'use strict';

	angular
		.module('starter')
		.factory("publications", publications);
		
	publications.$inject = ['$q','$log', 'httpRequests'];

	function publications($q, $log, httpRequests){
		var pub = {};
		var service = {
			getContentById: findContent,
			addInteractive: addInteractive,
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
				$log.debug('getRequest callback: %o', response);
				publications = response.data;
				deferred.resolve(response.data);
			}
			function errorHandler(e){
				$log.debug('getRequest errorHandler: %o', e);
				deferred.resolve(e);
			}
		}

		function iterator(o, path){
			var object = o;
			var searchedFile = path;

			if(angular.isDefined(object.children)){
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

		
		function addInteractive(compendium, searchedFolder, val){
			var searchedObject = {};
			folder_iterator(compendium.files, searchedFolder, val);
			return compendium;
		}

		function folder_iterator(o, path, v){
			var val = v;
			var object = o;
			var searchedFolder = path;
			if(angular.isDefined(object.children)){
				if(object.path == searchedFolder) {
					object.children.push(val);
					return;
				} else {
					for(var content in object.children){
						folder_iterator(object.children[content], searchedFolder, val);
					}
				}
			} else return;
		}

	}
})();