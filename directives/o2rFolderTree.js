"use strict";

app.directive('o2rFolderTree', function(){
	return{
		restrict: 'A',
		link: function(scope, iElement, iAttr){
			var tree = getTree();
			var btstrp = '';

			var object = angular.element(btstrp);
			iElement.append(object);
			//walk json structure and bind it to html-elements

			/*
			function walk(){
				bootstrap für rootelement = tree.name, tree.id
				für jedes element in chíldren do
					walk();
					add jedes child to folderTree
			}
				
			



			*/
		}
	}
});

function getTree(){
	var tree = {
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
						id: 3
						children: []
					},
					{
						path: 'http://infoscience.epfl.ch/record/136640/files/VandewalleKV09.pdf',
						name: 'VandewalleKV09.pdf',
						type: 'application/pdf',
						id: 4,
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
								name: 'DMI_conference.jpg'
								type: 'image/jpg',
								id: 7
								children: []
							}
						]
					}, {
				path: 'http://www.math.usu.edu/~corcoran/classes/14spring6550/handouts/reproducible_research.pdf',
				name: 'reproducible_research.pdf',
				type: 'application/pdf',
				id: 8
				children: []
			}
				]
			}, {
				path: 'putUrlHere',
				name: 'myText.txt',
				type: 'text/plain',
				id: 9
				children: []
			}
		]
	};
	return tree;
}