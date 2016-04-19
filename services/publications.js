app.factory("publications", function(){
	var publications = [
		{
			id: 1,
			title: 'Title 1',
			author: 'Author 1',
			year: "2016",
			url: "https://statistics.stanford.edu/sites/default/files/EFS%20NSF%20474.pdf"
		},
		{
			id: 2,
			title: 'Title 2',
			author: 'Author 2',
			year: "2016",
			url: "http://infoscience.epfl.ch/record/136640/files/VandewalleKV09.pdf"
		},
		{
			id: 3,
			title: 'Title 3',
			author: 'Author 3',
			year: "2016",
			url: "http://ifgi.uni-muenster.de/~epebe_01/eos.pdf"
		},
		{
			id: 4,
			title: 'Title 4',
			author: 'Author 4',
			year: "2016",
			url: "http://www.math.usu.edu/~corcoran/classes/14spring6550/handouts/reproducible_research.pdf"
		},	
	];
	
	var get = function(){
		return publications;
	};
	
	var findEntry = function(searchedID){
		for (publication in publications){
			if (publications[publication].id == searchedID){
				return publications[publication];
			}
		}
		return null;
	};
	
	return {
		getPublications: get,
		getEntryById: findEntry
	}; 		
});
