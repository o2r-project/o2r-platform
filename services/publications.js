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
				id: 1,
				children: [
					{
						path: '/home/Jan/Documents/o2r-platform/testCompendium/data/',
						name: 'data',
						id: 2,
						children: [
							{
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/',
								name: 'wd',
								id: 3,
								children: [
									{
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/ifgi.jpg',
										name: 'ifgi.jpg',
										type: 'image/jpg',
										id: 4,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.pdf',
										name: 'lab02-solution.pdf',
										type: 'application/pdf',
										id: 5,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/lab02-solution.Rmd',
										name: 'lab02-solution.Rmd',
										type: '',
										id: 6,
										size: 400,
										children: []
									}, {
										path: '/home/Jan/Documents/o2r-platform/testCompendium/data/wd/meteo.RData',
										name: 'meteo.RData',
										type: '',
										id: 7,
										size: 400,
										children: []
									}
								]
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.R',
								name: 'Bagtainer.R',
								type: '',
								id: 8,
								size: 800,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Bagtainer.yml',
								name: 'Bagtainer.yml',
								type: '',
								id: 9,
								size: 400,
								children: []
							}, {
								path: '/home/Jan/Documents/o2r-platform/testCompendium/data/Dockerfile',
								name: 'Dockerfile',
								type: '',
								id: 10,
								size: 400,
								children: []
							}
						]
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bag-info.txt',
						name: 'bag-info.txt',
						type: 'text/plain',
						id: 11,
						children: []
							}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/bagit.txt',
						name: 'bagit.txt',
						type: 'text/plain',
						id:12,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/manifest-md5.txt',
						name: 'manifest-md5.txt',
						type: 'text/plain',
						id: 13,
						size: 953,
						children: []
					}, {
						path: '/home/Jan/Documents/o2r-platform/testCompendium/tagmanifest-md5.txt',
						name: 'tagmanifest-md5.txt',
						type: 'text/plain',
						id: 14,
						size: 953,
						children: []
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
	var iterator = function (o, id){
		var object = o;
		var searchedId = id;

		if(object.children.length != 0){
			for(content in object.children){
				iterator(object.children[content], searchedId);
			}
		} else {
			if(object.id == searchedId){
				pub = object;
				return;
			} else {
				return;
			}
		}
		

	};

	var findContent = function(searchedId){
		var searchedObject = {};
		iterator(publications.content, searchedId);
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
