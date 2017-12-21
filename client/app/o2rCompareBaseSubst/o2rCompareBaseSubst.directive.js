/**
 * Directive for showing two html files for comparison reasons. In this case the base html and the new html of the substiutted ERC.
 * Expects 2 params:
 * o2r-base-html: path to html of finished job (success) of base ERC
 * o2r-subst-html: path to html of finished job (success) of substituted ERC
 *
 * Example:
 * <o2r-compare-base-subst o2r-base-html="'+html.base+'" o2r-subst-html="'+html.subst+'" flex="100">
 */

(function(){
    'use strict';

    angular
        .module('starter.o2rCompareBaseSubst')
        .directive('o2rCompareBaseSubst', o2rCompareBaseSubst);

    o2rCompareBaseSubst.$inject = ['$rootScope','$log', 'jobs', 'icons', 'socket', '$mdDialog', 'env'];
    function o2rCompareBaseSubst($rootScope, $log, jobs, icons, socket, $mdDialog, env){
        return{
            restrict: 'E',
            templateUrl: 'app/o2rCompareBaseSubst/o2rCompareBaseSubst.template.html',
            scope: {
                o2rBaseHtml: '@',
                o2rSubstHtml: '@'
            },
            link: link
        };

        function link(scope, iElemtn, attrs){
            attrs.$observe('o2rBaseHtml', function(val_) {
                if(val_ != '') {
                  var logger = $log.getInstance('o2rCompareBaseSubst');

                    scope.icons = icons;
                    scope.subst = {};
                    scope.base = {};
                    scope.subst.path = scope.o2rSubstHtml;
                    scope.subst.type = "text/html";
                    scope.base.path = scope.o2rBaseHtml;
                    scope.base.type = "text/html";

                    scope.cancel = cancel;
                    logger.info('comparison of base html and substituted html');

                    /////

                    function cancel(){
                      $mdDialog.cancel();
                    }
                }
            });
        }
      }
})(window.angular);
