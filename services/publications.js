app.factory("publications", ['$http', function($http){
	/*
	var publications = {
			id: 1,
			title: 'Title 1',
			author: 'Author 1',
			year: '2016',
			files: {
				path: '/home/Jan/Documents/o2r-platform/testCompendium/',
				name: 'root',
				type: 'folder',
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										size: 400
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										size: 400
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										size: 400
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										size: 400
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								size: 800
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								size: 400
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								size: 400
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						size: 953
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						size: 953
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						size: 953
					}
				]
			}	
	};

	*/

	/**
	* @Desc Ajax call for getting publication metadata  
	* 		 GET /api/v1/compendium/:id
	* @Param id - compendium id
	*/
	/*
	var httpRequest = function(compId){
		
		$http({
			method: 'GET',
			//true url			
			//url: '/api/v1/compendium/' + compId

			//wrong url, just for testing
			url: 'http://ubsvirt148.uni-muenster.de:8080/api/v1/job/56gPv'
		}).then(function successCallback(response){
			console.log(response.data);
			publications = response.data;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
		
		console.log('placeholder for httpGET: /api/v1/compendium/:id');
	};
	*/
	/*
	var get = function(){
		return publications;
	};

	var getAllContent = function(){
		return publications.files;
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



	
	return {
		getPublications: get,
		getAllContent: getAllContent,
		getContentById: findContent
	}; 		
	*/

	/*#######
	#########
	#########
	Alternative
	#########
	#########*/
	
	var publications;

	var getRequest = function(url, callback){
		$http.get(url).success(function(response){
			publications = response;
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
