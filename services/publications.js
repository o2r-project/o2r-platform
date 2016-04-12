app.service("publications", function(){
	var publications = [
		{
			id: 1,
			title: 'Title 1',
			author: 'Author 1',
			year: "2016",
		},
		{
			id: 2,
			title: 'Title 2',
			author: 'Author 2',
			year: "2016",
		},
		{
			id: 3,
			title: 'Title 3',
			author: 'Author 3',
			year: "2016",
		},
		{
			id: 4,
			title: 'Title 4',
			author: 'Author 4',
			year: "2016",
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
