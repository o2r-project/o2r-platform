"use strict";

app.directive('o2rDisplayFiles', ['publications', function(publications){
	return{
		restrict: 'E',
		link: function(scope, iElement, attrs){
			/*
			var index = window.location.href.split('/');
			index = index[index.length - 1];
			index = parseInt(index);
			*/

			
			attrs.$observe('o2rid', function(value){
				
				var file = publications.getContentById(value);
				if(typeof file.type !== "undefined"){
					$('o2r-display-files').empty();
					var mime = file.type.split('/');
					mime = mime[0];


					switch (mime){
						case 'application':
							var object = angular.element('<object class="pdf" type="application/pdf" data="' + file.path +  '"</object>');
							iElement.append(object);
							break;
						case 'image':
							var object = angular.element('<img src="' + file.path + '">');
							iElement.append(object);
							break;
						default: 
							var object = angular.element('<pre>' + file.path + '</pre>');
							iElement.append(object);
					}

				}






			});
			
			


		}
	}
}]);