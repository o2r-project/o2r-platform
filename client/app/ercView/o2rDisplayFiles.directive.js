(function(){
	'use strict';

	/*
		Directive for displaying different file types.
		This directive checks the mime type attribute of a publication.content.<element> to handle it differently considering its mime type.
		Directive can only be used as Html-Element and expects an attribute o2r-file.
		o2r-file must be an object with at least following attributes:
		
		{
		size: Integer,
		type: String,
		path: String
		}

		Example: 
		<o2r-display-files o2r-file="{'foo': 'bar'}"></o2r-display-files>
	*/
	angular
		.module('starter')
		.directive('o2rDisplayFiles', o2rDisplayFiles);

	o2rDisplayFiles.$inject= ['$log', 'env'];
	function o2rDisplayFiles($log, env){
		return{
			restrict: 'E',
			templateUrl: 'app/ercView/o2rDisplayFiles.template.html',
			link: link
		};

		function link(scope, iElement, attrs){
			$log.debug('in o2rDisplayFiles');
			scope.file;
			scope.sizeRestriction = env.sizeRestriction;

			attrs.$observe('o2rFile', function(value){
				if(value != ''){
					scope.file = JSON.parse(value);
					var mime = scope.file.type.split('/');
					scope.mime = mime[0];
					scope.useHljs = useHljs();
					
					function useHljs(){
						if( (scope.file.type == 'application/pdf') || (scope.mime == 'image') || (scope.mime == 'audio') || (scope.mime == 'video')){
							return false;
						}	
						return true;
					}
					
				}
			});
		}
	}
})();