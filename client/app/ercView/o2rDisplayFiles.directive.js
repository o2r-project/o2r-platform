(function(){
	'use strict';

	/*
		Directive for displaying different file types.
		This directive checks the mime type attribute of a publication.content.<element> to handle it differently considering its mime type.
		Directive can only be used as Html-Element and expects an attribute o2rid.
		Example: 
		<o2r-display-files o2rid="7"></o2r-display-files>
	*/
	angular
		.module('starter')
		.directive('o2rDisplayFiles', o2rDisplayFiles);
		
		o2rDisplayFiles.$inject = ['publications', '$http', 'sizeRestriction'];
		
		function o2rDisplayFiles(publications, $http, sizeRestriction){
			return{
				restrict: 'E',
				link: function(scope, iElement, attrs){
					attrs.$observe('o2rid', function(value){ //checks if o2rid-attribute changes
						var file = publications.getContentById(scope.vm.publication, value);
						//var _url = url.slice(0, 33);
						
						if(typeof file.type !== "undefined"){ //check if found element is a file
							$('o2r-display-files').empty(); //remove existing content
							var _mime = file.type.split('/'); //prepare mime type
							_mime = _mime[0]; //prepare mime type
							var path = file.path;

							// check mime type
							if(file.type == 'application/pdf'){
								_addContent(1);
							} else if(_mime == 'image'){
								_addContent(2);
							} else if(_mime == 'audio'){
								_addContent(3);
							} else if(_mime == 'video'){
								_addContent(4);
							} else {
								_addContent();
							}

							//create html-tags depending on mime type
							function _addContent(type){
								var _sizeError = '<div class="jumbotron"><center><h2>Filesize is too big to display</h2><p><a href="' + path + '" download>Download</a> file to see its content</p></center></div>';
								if(file.size < sizeRestriction){
									switch(type){
										case 1:
											var object = angular.element('<object class="erc_pdf" type="application/pdf" data="' + path +  '"</object>');
											break;
										case 2:
											var object = angular.element('<img class="erc_img" src="' + path + '">');
											break;
										case 3:
											var object = angular.element('<audio controls><source src="' + path + '" type="' + file.type + '"></source>Your browser does not support audio element.</audio>');
											break;
										case 4:
											var object = angular.element('<video class="erc_video" controls><source src="' + path + '"></source>Your browser does not support the video tag.</video>');
											break;
									}
								} else {
									if(type == 2){
										var object = angular.element('<div class="jumbotron"><img class="erc_jumboImg" src="' + path + '?width=140&height=140"><center><h2>Filesize is too big to display</h2><p><a href="' + path + '" download>Download</a> file to see its content</p></center></div>');
									} else {
									var object = angular.element(_sizeError);
									}
								}
								iElement.append(object);
							}
						}
					});
				}
			}
		}
})();