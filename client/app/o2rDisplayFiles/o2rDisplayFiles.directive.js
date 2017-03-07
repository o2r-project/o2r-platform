(function(){
	'use strict';

	/*
		Directive for displaying different file types.
		This directive checks the mime type attribute of a publication.content.<element> to handle it differently considering its mime type.
		Directive can only be used as Html-Element and expects an attribute o2r-file.
		o2r-file must be an object with at least following attribute:
		
		{
		path: String
		}

		Example: 
		<o2r-display-files o2r-file="{'path': 'foo/bar'}"></o2r-display-files>

		optional attributes:

		{
			size: Integer,
			type: String
		}
		
		where size is the filesize in bytes and type is the mime type.
	*/
	angular
		.module('starter.o2rDisplayFiles')
		.directive('o2rDisplayFiles', o2rDisplayFiles);

	o2rDisplayFiles.$inject= ['$log', 'env'];
	function o2rDisplayFiles($log, env){
		return{
			restrict: 'E',
			templateUrl: 'app/o2rDisplayFiles/o2rDisplayFiles.template.html',
			scope: {
				o2rFile: '@'
			},
			link: link
		};

		function link(scope, iElement, attrs){		
			$log.debug('in o2rDisplayFiles');
			scope.file;
			scope.sizeRestriction = env.sizeRestriction;
			/*
			scope.useSync = function(){
				if(angular.isDefined(scope.o2rSyncScroll) && scope.o2rSyncScroll == true) return true;
				else return false;
			}
			*/
			attrs.$observe('o2rFile', function(value){
				if(value != ''){
					scope.file = angular.fromJson(value);
					var mime;
					// if no mime type is defined hljs will be used for display
					if(angular.isDefined(scope.file.type)){
						mime = scope.file.type.split('/');
						scope.mime = mime[0];
					} else {
						scope.mime = '';
					}

					if(angular.isUndefined(scope.file.size)){
						scope.file.size = null;
					}

					scope.useHljs = useHljs();
					
					function useHljs(){						
						if( (scope.file.type == 'application/pdf') || (scope.mime == 'image') || (scope.mime == 'audio') || (scope.mime == 'video') || (scope.file.type == 'text/html')){
							return false;
						}
						return true;
					}
					
				}
			});
		}
	}
})(window.angular);