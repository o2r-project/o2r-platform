(function(ngIframeResizer) {
    'use strict';

    angular
        .module(ngIframeResizer, [])
        .directive(ngIframeResizer, function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    iFrameResize({checkOrigin: false}, element[0]);
                }
            };
        });

}('ngIframeResizer'));
