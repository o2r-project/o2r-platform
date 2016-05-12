"use strict";

app.directive('o2rFolderTree', function(){
	return{
		restrict: 'A',
		link: function(scope, iElement, iAttr){


			/*

			########################################################
			############## Pseudo ##################################
			########################################################

			Ziel: 
				Ordnerstruktur darstellen; Dateien onClick darstellen
			Vorgehen: 
				Rekursive iteration über object
				Bei jeder iteration wird entweder ein Ordner erstellt, oder eine Datei
					Ist es ein Ordner, 
						bei onClick Dropdownmenü ein-/ausklappen
						Rekursive iteration über Ordner
					Ist es eine Datei, 
						bei onClick Inhalt im Fenster darstellen

			Bsp:
			drdwn = dropdown menü
			erstelle drdwn:1 von tree:1
			function walkTree(ordner, id){
				prüfe ob Tree:1.children leer
					true
						append <div o2r-display-files>
					false
						for each (tree:1.children)
							erstelle drdwn von tree:1.children
							walkTree(tree:1.children, id)

			}

			
			*/

			var tree = getTree();
			console.log(tree);

			//create initial dropdown
			var id = "root";
			var dropdown = "<div class='panel-group' id='pg_" + id + "' role='tablist' aria-multiselectable='true'><div class='panel panel-default'><div class='panel-heading' role='tab' id='ph_" + id + "'><h4 class='panel-title'><a role='button' data-toggle='collapse' data-parent='#pg_" + id + "' href='#pc_" + id + "' aria-expanded='true' aria-controls='pc_" + id + "'>" + tree.name + "</a></h4></div></div><div id='pc_" + id + "' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='ph_" + id + "'><div class='panel-body' id='pb_" + id + "'></div></div></div>"
			var file = "<a href='#/author/" + id + "'>" + tree.name + "</a>"
			iElement.append(dropdown);

			//call walkTree()
			walkTree(tree, id);



			/**
			* @Desc Iterates over every node in object and creates a bootstrap dropdown-menu. 
			*       Files will be displayes as anchors
			* 
			* @Param o, object structured like npm directory-tree (https://www.npmjs.com/package/directory-tree)
			* 		 pid, id of element, from where walkTree() is called 
			*/
			function walkTree(o, pid){

				var tree = o;
				var parent = '#pb_' + pid;
				var id = tree.id;
				if (tree.children.length == 0){
					$(parent).append(file);
				} else {
					for (var node in tree.children){
						$(parent).append(dropdown);
						walkTree(tree.children[node], id);
					}
				}
			}


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
						id: 3,
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
								name: 'DMI_conference.jpg',
								type: 'image/jpg',
								id: 7,
								children: []
							}
						]
					}, {
				path: 'http://www.math.usu.edu/~corcoran/classes/14spring6550/handouts/reproducible_research.pdf',
				name: 'reproducible_research.pdf',
				type: 'application/pdf',
				id: 8,
				children: []
			}
				]
			}, {
				path: 'putUrlHere',
				name: 'myText.txt',
				type: 'text/plain',
				id: 9,
				children: []
			}
		]
	};
	return tree;
}