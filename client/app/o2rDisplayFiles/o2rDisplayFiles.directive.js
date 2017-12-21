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
			type: String,
			source: String
		}
		
		where size is the filesize in bytes, type is the mime type and source is the source text of a file.
	*/
	angular
		.module('starter.o2rDisplayFiles')
		.directive('o2rDisplayFiles', o2rDisplayFiles);

	o2rDisplayFiles.$inject= ['$log', '$http', 'env', 'httpRequests'];
	function o2rDisplayFiles($log, $http, env, httpRequests){
		return{
			restrict: 'E',
			templateUrl: 'app/o2rDisplayFiles/o2rDisplayFiles.template.html',
			scope: {
				o2rFile: '@'
			},
			link: link
		};

		function link(scope, iElement, attrs){		
			scope.file;
			scope.sizeRestriction = env.sizeRestriction;
			attrs.$observe('o2rFile', function(value){
				if(value != ''){
					scope.file = angular.fromJson(value);
					if(!scope.file.path && !scope.file.source) throw 'path and source are undefined';
					scope.iframeOptions = {
						checkOrigin: false,
						log: true
					};
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
					scope.file.fileEnding = setFileType();


					function setFileType(){
						// set File type based on file ending
						if(scope.file.path){
							var ending = scope.file.path.split('.');
							ending = ending[ending.length-1];
							//exceptions, where file ending does not match a highlighting class of prism
							if(ending === 'Rmd') ending = 'r';
						} else {
							ending = 'r';
						}
						return ending;
					}

					// if no source is given, load source from file.path
					if(scope.useHljs && (!scope.file.source)){
						$http.get(scope.file.path)
						.then(function(response){
							scope.file.source = response.data;
						})
						.catch(function(err){
							$log.error(err);
						});
					}

					scope.parseCsv = parseCsv();
					
					function parseCsv(){
						if (scope.file.type == 'text/csv'){
							httpRequests.getCSV(scope.file.path)
							.then(function(res){
								scope.csvContent = res.data.split(/\r\n|\n/);
								for (var i in scope.csvContent){
									scope.csvContent[i] = scope.csvContent[i].split(',')
								}
							});
						}
					}					
					
					function useHljs(){						
						if( (scope.file.type == 'text/csv') ||  (scope.file.type == 'application/pdf') || (scope.mime == 'image') || (scope.mime == 'audio') || (scope.mime == 'video') || (scope.file.type == 'text/html') || (scope.file.type == 'text/shiny')){
							return false;
						}
						return true;
					}
					
				}
			});
		}
	}
})(window.angular);