app.factory("publications", function(){
	var publications = {
			id: 1,
			title: 'Title 1',
			author: 'Author 1',
			year: '2016',
			content: [
				{
					id: 1,
					type: 'application/pdf',
					name: 'EFS%20NSF%20474.pdf',
					url: 'https://statistics.stanford.edu/sites/default/files/EFS%20NSF%20474.pdf',
					show: false
				},
				{
					id: 2,
					type: 'image/jpg',
					name: 'Alte_Herrenh%C3%A4user_Stra%C3%9Fe_10_Hannover_Hardenbergsches_Haus_S%C3%BCdfront.jpg',
					url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Alte_Herrenh%C3%A4user_Stra%C3%9Fe_10_Hannover_Hardenbergsches_Haus_S%C3%BCdfront.jpg',
					show: false
				},
				{
					id: 3,
					type: 'application/pdf',
					name: 'VandewalleKV09.pdf',
					url: 'http://infoscience.epfl.ch/record/136640/files/VandewalleKV09.pdf',
					show: false
				},
				{
					id: 4,
					type: 'application/pdf',
					name: 'eos.pdf',
					url: 'http://ifgi.uni-muenster.de/~epebe_01/eos.pdf',
					show: false
				},
				{
					id: 5,
					type: 'application/pdf',
					name: 'reproducible_research.pdf', 
					url: 'http://www.math.usu.edu/~corcoran/classes/14spring6550/handouts/reproducible_research.pdf',
					show: false
				},
				{
					id: 6,
					type: 'image/jpg',
					name: 'DMI_conference.jpg',
					url:'https://upload.wikimedia.org/wikipedia/commons/d/dc/DMI_conference.jpg',
					show: false
				},
				{
					id: 7,
					type: 'application/png',
					name: 'fb_schild_rosenstrasse.png',
					url: 'https://www.uni-muenster.de/imperia/md/images/philologie/2014/gebaeude/fb_schild_rosenstrasse_9_2_1_746x374.png',
					show: false
				},
				{
					id: 8,
					type: 'text/plain',
					name: 'my text.txt',
					url: 'putUrlHere',
					show: false
				}
			]	
	};
	
	var get = function(){
		return publications;
	};
	
	var getAllContent = function(){
		return publications.content;
	};

	var findContent = function(searchedId){
		for(content in publications.content){
			if(publications.content[content].id == searchedId){
				return publications.content[content];
			}
		}
		return null;
	};


	
	return {
		getPublications: get,
		getAllContent: getAllContent,
		getContentById: findContent
	}; 		
});
