/**
 * @desc creates a material-ui menu with download links to a specific compendium
 * @param ercId, String containing the id of the erc
 * @param filesize String containting the filesize in bytes
 * @example <o2r-erc-download erc-id="1234"></o2r-erc-download>
 */
(function(){
    'use strict';

    angular
        .module('starter.o2rErcDownload')
        .directive('o2rErcDownload', o2rErcDownload);

    o2rErcDownload.$inject = ['$mdDialog', 'icons'];
    function o2rErcDownload($mdDialog, icons){
        return{
            restrict: 'E',
            scope: {
                ercId: '@ercId',
                filesize: '&filesize'
            },
            templateUrl: 'app/o2rErcDownload/o2rErcDownload.template.html',
            link: link
        };

        function link(scope){
            scope.size = scope.filesize();
            scope.icons = icons;
            scope.excImg = exclude;
            scope.openMenu = function($mdOpenMenu, ev){
                $mdOpenMenu(ev);
            };

            function exclude(bool){
                if(bool) return false;
                return true;
            }
        }
    }

})();