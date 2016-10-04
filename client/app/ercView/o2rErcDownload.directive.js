/**
 * @desc creates a material-ui menu with download links to a specific compendium
 * @param file-id, String containing the id of the erc
 * @example <o2r-erc-download erc-id="1234"></o2r-erc-download>
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .directive('o2rErcDownload', o2rErcDownload);

    o2rErcDownload.$inject = ['$mdDialog'];
    function o2rErcDownload($mdDialog){
        return{
            restrict: 'E',
            scope: {
                ercId: '@ercId'
            },
            templateUrl: 'app/ercView/ercDownload.template.html',
            link: link
        };

        function link(scope, attrs){
            scope.openMenu = function($mdOpenMenu, ev){
                var originatorEv = ev;
                $mdOpenMenu(ev);
            };
        }
    }

})();