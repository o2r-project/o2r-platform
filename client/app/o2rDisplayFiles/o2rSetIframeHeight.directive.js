(function(){
    'use strict';

    angular
        .module('starter.o2rDisplayFiles')
        .directive('setIframeHeight', setIframeHeight);
    
    setIframeHeight.$inject = ['$log', '$timeout'];
    function setIframeHeight($log, $timeout){
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs){
            var iFrameHeight = '';
            element.on('load', setHeight);
            element.on('change', setHeight);
            refresh();

            function setHeight(){
                iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 'px';
                $log.debug('setting iFrame height to %s', iFrameHeight);
                element.css('height', iFrameHeight);
            }

            function refresh(){
                $timeout(setHeight, 2000);
            }
        }
    }
})();