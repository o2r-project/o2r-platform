(function(){
    'use strict';

    /*
        Directive for displaying multiple file contents at once.
        Uses o2r-display-files for display.
        Directive can only be used as an html element and expects an attribute compare.
        compare must be an array of objects, containing at least following attributes:

        {
		size: Integer,
		path: String
        }

        Example: 
        <o2r-compare compare="[{foo: 'bar'}]"></o2r-compare>
    */
    angular
        .module('starter.o2rCompare')
        .directive('o2rCompare', o2rCompare);

    o2rCompare.$inject = ['$log'];
    function o2rCompare($log){
        return{
			restrict: 'E',
			templateUrl: 'app/o2rCompare/o2rCompare.template.html',
            scope: {
                compare: '&'
            },
			link: link
		};

		function link(scope, iElement, attrs){
            scope.files = scope.compare();
            $log.debug(scope.files);
        }
    }
})();