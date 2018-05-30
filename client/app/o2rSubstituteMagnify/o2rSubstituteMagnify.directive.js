(function(){
    'use strict';

  	/*
  		Directive for displaying two files for comparison.
  		This directive uses the o2rDisplayFiles directive to show two files nex to each other for comparison.
      o2r-overlay-id must be a String.
  		o2r-base-file, o2r-overlay-file must be a String that contains the path to a file.

  		Example:
  		<o2r-substitute-magnify o2r-base-file="foo/bar" o2r-overlay-file="foo/bar" o2r-overlay-id)="{{"foo"}}"></o2r-substitute-magnify>
  	*/
    angular
        .module('starter.o2rSubstituteMagnify', [])
        .directive('o2rSubstituteMagnify', o2rSubstituteMagnify);

    o2rSubstituteMagnify.$inject = ['$stateParams', '$log', '$mdDialog', 'icons'];
    function o2rSubstituteMagnify($stateParams, $log, $mdDialog, icons){
        return{
    			restrict: 'E',
    			templateUrl: 'app/o2rSubstituteMagnify/o2rSubstituteMagnify.template.html',
    			scope: {
    				o2rBaseFile: '@',
    				o2rOverlayFile: '@',
                    o2rOverlayId: '@'
    			},
    			link: link
    		};

        function link(scope, iElemtn, attrs) {
            var logger = $log.getInstance('SubstituteCtrl');

            attrs.$observe('o2rBaseFile', function(val_) {
    				    if(val_ != '') {

                    scope.icons = icons;
                    scope.magnBase = {};
                    scope.magnBase.path = '/api/v1/compendium/' + $stateParams.ercid + '/data/' + scope.o2rBaseFile;
                    scope.magnOverlay = {};
                    scope.magnOverlay.path = '/api/v1/compendium/' + scope.o2rOverlayId + '/data/' + scope.o2rOverlayFile;
                    logger.info('substituteMagnify view with files basefile [%s] and overlayfile [%s]', scope.magnBase.path, scope.magnOverlay.path);

                    scope.cancel = cancel;
                    scope.hide = hide;
                    scope.answer = answer;
                    scope.fileEdit = fileEdit;
                    scope.saveEdit = saveEdit;

                    /////

                    function fileEdit(filepath) {
                        logger.info(filepath);
                    };

                    function saveEdit() {
                    };

                    function cancel (){
                        $mdDialog.cancel();
                    };

                    function hide () {
                        $mdDialog.hide();
                    };

                    function answer (answer) {
                        $mdDialog.hide(answer);
                    };
                }
            })
        }
    }
})(window.angular)
