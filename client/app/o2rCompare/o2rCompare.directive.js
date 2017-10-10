(function(){
    'use strict';

    /*
        Directive for displaying multiple file contents at once.
        Uses o2r-display-files for display.
        Directive can only be used as an html element and expects an attribute compare.
        compare must be an array of objects, containing at least following attribute:

        {
		path: String
        }

        Example: 
        <o2r-compare compare="[{'path': 'foo/bar'}]"></o2r-compare>
        
        optional attributes:

		{
			size: Integer,
			type: String
		}
		
		where size is the filesize in bytes and type is the mime type.
    */
    angular
        .module('starter.o2rCompare')
        .directive('o2rCompare', o2rCompare);

    o2rCompare.$inject = ['$log', 'icons'];
    function o2rCompare($log, icons){
        return{
			restrict: 'E',
			templateUrl: 'app/o2rCompare/o2rCompare.template.html',
            scope: {
                compare: '&'
            },
			link: link
		};

		function link(scope, iElement, attrs){
            scope.icons = icons;
            scope.files = scope.compare();
            $log.debug(scope.files);
            scope.sync = false;
            scope.toggleSync = function(){
                scope.sync = !scope.sync;
            };

        }
    }
})();