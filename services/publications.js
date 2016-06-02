app.factory("publications", function(){
	var publications = {
			id: 1,
			title: 'Title 1',
			author: 'Author 1',
			year: '2016',
			content: {
				path: 'xy',
				name: 'root',
				type: 'folder',
				id: 1,
				children: [
					{
						path: 'xxy',
						name: 'subfolder 1',
						type: 'folder',
						id: 2,
						children: [
							{
								path: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Alte_Herrenh%C3%A4user_Stra%C3%9Fe_10_Hannover_Hardenbergsches_Haus_S%C3%BCdfront.jpg',
								name: 'Altes_Herrenhaus.jpg',
								type: 'image/jpg',
								id: 3,
								size: 300,
								children: []
							},
							{
								path: 'http://infoscience.epfl.ch/record/136640/files/VandewalleKV09.pdf',
								name: 'VandewalleKV09.pdf',
								type: 'application/pdf',
								id: 4,
								size: 1000,
								children: []
							}
						]
					}, {
						path: 'xyx',
						name: 'subfolder2',
						type: 'folder',
						id: 5,
						children: [
							{
								path: 'xxxy',
								name: 'subfolder3',
								type: 'folder',
								id: 6,
								children: [
									{
										path: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/DMI_conference.jpg',
										name: 'DMI_conference.jpg',
										type: 'image/jpg',
										id: 7,
										size: 600,
										children: []
									}, {
										path: 'xxxxy',
										name: 'subfolder 4',
										type: 'folder',
										id: 10,
										children: [
											{
												path: 'http://infoscience.epfl.ch/record/136640/files/VandewalleKV09.pdf',
												name: 'Just another image',
												type: 'application/pdf',
												id: 11,
												size: 900,
												children: []
											}

										]
									}
								]
							}, {
						path: 'http://www.math.usu.edu/~corcoran/classes/14spring6550/handouts/reproducible_research.pdf',
						name: 'reproducible_research.pdf',
						type: 'application/pdf',
						id: 8,
						size: 953,
						children: []
					}
						]
					}, {
						path: 'putUrlHere',
						name: 'myText.txt',
						type: 'text/plain',
						id: 9,
						size: 10,
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
