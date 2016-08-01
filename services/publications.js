'use strict';
app.factory("publications", ['httpRequests', function(httpRequests){
	var publications;

	var getRequest = function(id, callback){
		httpRequests.singleCompendium(id, function(response){
			publications = response.data;
			callback();
		});
	};


	var pub = {};
	var iterator = function (o, path){
		var object = o;
		var searchedFile = path;

		if(typeof object.children != 'undefined'){
			for(content in object.children){
				iterator(object.children[content], searchedFile);
			}
		} else {
			if(object.path == searchedFile){
				pub = object;
				return;
			} else {
				return;
			}
		}
	};

	var findContent = function(searchedFile){
		var searchedObject = {};
		iterator(publications.files, searchedFile);
		searchedObject = pub;
		pub = {};
		return searchedObject;
	};

	var get = function(){
		return publications;
	};

	return {
		getPublications: get,
		getContentById: findContent,
		getRequest: getRequest
	};

}]);
