"use strict";

/*
	Directive for displaying different file types.
	This directive checks the mime type attribute of a publication.content.<element> to handle it differently considering its mime type.
	Directive can only be used as Html-Element and expects an attribute o2rid.
	Example: 
	<o2r-display-files o2rid="7"></o2r-display-files>
*/
app.directive('o2rDisplayFiles', ['publications', function(publications){
	return{
		restrict: 'E',
		link: function(scope, iElement, attrs){

			//checks if o2rid-attribute changes
			attrs.$observe('o2rid', function(value){
				
				var file = publications.getContentById(value);

				//check if found element is a file
				if(typeof file.type !== "undefined"){

					//remove existing content
					$('o2r-display-files').empty();

					//prepare mime type
					var mime = file.type.split('/');
					mime = mime[0];

					//create html-tags depending on mime type
					switch (mime){
						case 'application':
							if(file.size < 1000){
								var object = angular.element('<object class="pdf" type="application/pdf" data="' + file.path +  '"</object>');
							} else {
								var object = angular.element('<div class="jumbotron"><center><h2>Filesize is too big to display</h2><p><a href="">Download</a> file to see its content</p></center></div>'); 
							}
							iElement.append(object);
							break;
						case 'image':
							if(file.size < 1000){
								var object = angular.element('<img src="' + file.path + '">');
							} else {
								var object = angular.element('<div class="jumbotron"><center><h2>Filesize is too big to display</h2><p><a href="">Download</a> file to see its content</p></center></div>');
							}
							iElement.append(object);
							break;
						default: 
							if(file.size < 1000){
								var object = angular.element('<pre><code>' + file.path + '</code></pre>');
							} else {
								var object = angular.element('<div class="jumbotron"><center><h2>Filesize is too big to display</h2><p><a href="">Download</a> file to see its content</p></center></div>');
							}
							iElement.append(object);
					}
				}
			});
		}
	}
}]);