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
		.module('starter.o2rDisplayFiles', ['ngMaterial', 'md.data.table'])
		.directive('o2rDisplayFiles', o2rDisplayFiles)
        .filter('startFrom', function() {
            return function(input, start) {
                let object = {};
                if (input[0].constructor != object.constructor) {
                    start = +start; //parse to int
                    return input.slice(start);
                }
                else {
                    let arrayOfObjects = [];
                    for (let i = 0; i < input.length; i++) {
                        arrayOfObjects[i] = JSON.stringify(input[i]);
                	}
                	return arrayOfObjects;
				}
            }
        });

	o2rDisplayFiles.$inject= ['$log', '$http', 'env', 'httpRequests', '$window'];
	function o2rDisplayFiles($log, $http, env, httpRequests, $window){
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
					scope.file.containsRData = false;
					if(!scope.file.path && !scope.file.source) throw 'o2rDisplayFiles: path and source are undefined';
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
                            if(ending === 'Rdata' || ending === 'RData' || ending === 'rda') {
                            	ending = 'rda';
                            }
						} else {
							ending = 'r';
						}
						return ending;
					}

                    if ((scope.useHljs) && (!scope.file.source) && (scope.file.fileEnding == 'rda'))
                    {
                    	let tmpPath = scope.file.path.replace("/api/v1/compendium/","");
                    	let ercId = tmpPath.slice(0,5);
                    	let pathInERC = tmpPath.slice(11, tmpPath.length);
						let inspectionQuery = "/api/v1/inspection/" + ercId + "?file=" + pathInERC;
						scope.file.source = inspectionQuery;
						if (scope.file.size <= scope.sizeRestriction) {
                            $http.get(inspectionQuery)
                                .then(function (response) {
                                    scope.file.source = response.data;
                                    scope.file.containsRData = true;

                                    function toPrettyJSON(data) {
                                        let obj = data;
                                        let result = JSON.stringify(obj, null, 4);
                                        scope.RData.FullJSON = obj;
                                        scope.RData.FullJSONString = result;
                                    }
                                    toPrettyJSON(response.data);
                                })
                                .catch(function (err) {
                                    $log.error(err);
                                });
                        }
					}

					// if no source is given, and type not 'RData', load source from file.path
					else
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

					$('iframe').on("load", function(){

						var iframe = $('iframe').contents();
			
						iframe.on("mousedown, mouseup, click", function(){
							console.log("frame");
						});
				
						iframe.click(function(){
							console.log("frame");
						});
					});
					
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

            scope.RData = {
                // Attributes
            	selected: {
            		value: null,
					type: "",
					// only used for Matrices (Dimensions)
					longestRow: undefined
                },
				FullJSONString: "",

				// operations

                is1DArray: function () {
                    let obj = {};
                    let array = [];
                    let selectedAttribute = this.selected.value;
                    if (selectedAttribute[0] != undefined) {
                 	   if (selectedAttribute[0].constructor !== obj.constructor && selectedAttribute[0].constructor !== array.constructor) this.selected.type = "array";
                    }
				},

				isMatrix: function () {
					let array = [];
					let selectedAttribute = this.selected.value;
                    if (selectedAttribute[0] != undefined) {
                        if (selectedAttribute[0].constructor === array.constructor) {
                            this.selected.type = "matrix";
                            this.findLongestRow();
                        }
                    }
				},

				isObjectArray: function () {
					let obj = {};
                    let selectedAttribute = this.selected.value;
                    if (selectedAttribute[0] != undefined) {
                        if (selectedAttribute[0].constructor === obj.constructor && !selectedAttribute[0].length) this.selected.type = "objectArray";
                    }
				},

				isObject: function () {
            		let obj = {};
            		let selectedAttribute = this.selected.value;
            		if (selectedAttribute.constructor === obj.constructor) {
            			this.selected.type = "object";
            			this.selected.value = JSON.stringify(this.selected.value, null, 4);
                    }
				},

				findLongestRow: function () {
            		let currentLongest = new Array(0);
            		let arrayOfRows = this.selected.value;
            		for (let currentRowPosition = 0; currentRowPosition < arrayOfRows.length; currentRowPosition++) {
            			if (arrayOfRows[currentRowPosition].length > currentLongest.length) currentLongest = arrayOfRows[currentRowPosition];
					}
					this.selected.longestRow = currentLongest;
				},

				newSelection: function (selected) {
					this.selected.value = selected;
					this.selected.type = "";
					this.selected.longestRow = undefined;
					scope.currentPage = 0;

					// get selected data type
					if (selected != null) {

                        try {
                            // check if:
                            this.is1DArray();
                            this.isMatrix();
                            this.isObjectArray();
                            this.isObject();
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
				},

				getRows: function () {
					return this.selected.value;
                }
			};

            scope.currentPage = 0;
            scope.pageSize = 10;
            scope.numberOfPages = numberOfPages;

            function numberOfPages(){
                if (scope.RData.selected.value.length) {
                    return Math.ceil(scope.RData.selected.value.length / scope.pageSize);
                } else return 1;
            }
		}

	}

})(window.angular);