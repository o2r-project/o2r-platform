app.factory("publications", function(){
	var publications = {
			id: 1,
			title: 'Title 1',
			author: 'Author 1',
			year: '2016',
			content: {
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
	
	var get = function(){
		return publications;
	};
	
	var getAllContent = function(){
		return publications.content;
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
		iterator(publications.content, searchedFile);
		searchedObject = pub;
		pub = {};
		return searchedObject;
	};



	
	return {
		getPublications: get,
		getAllContent: getAllContent,
		getContentById: findContent
	}; 		
});
