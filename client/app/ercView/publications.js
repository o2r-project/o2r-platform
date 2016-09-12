(function(){
	'use strict';

	angular
		.module('starter')
		.factory("publications", publications);
		
	publications.$inject = ['httpRequests'];

	function publications(httpRequests){
		var publications;
		var pub = {};
		var service = {
			getPublications: get,
			getContentById: findContent,
			getRequest: getRequest
		};

		return service;

		////////////

		function getRequest(id, callback){
			httpRequests.singleCompendium(id, cb);

			function cb(response){
				publications = response.data;
				callback();
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

		function findContent(searchedFile){
			var searchedObject = {};
			iterator(publications.files, searchedFile);
			searchedObject = pub;
			pub = {};
			return searchedObject;
		}

		function get(){
			return publications;
		}
	}
})();