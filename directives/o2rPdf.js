app.directive('o2rPdf', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var url = scope.$eval(attrs.ngSrc);
            element.replaceWith('<object type="application/pdf" data="' + url + '"></object>');
        }
    };
});