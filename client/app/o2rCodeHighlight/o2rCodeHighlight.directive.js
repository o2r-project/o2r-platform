/**
 * Credits to Pawel Golab https://stackoverflow.com/questions/22742899/using-prismjs-in-angular-app
 */
/**
 * Directive for highlighting text.
 * This directive is based on prism.js and therefore depends all script and css file to run prism.js
 * 
 * This directive allows two things:
 * 1. highlighting code
 * 2. highlighting specific lines of code
 * 
 * To use the directive, a <pre>-element MUST have the attributes o2r-code-highlight and o2r-source.
 * The optional attribute o2r-line-highlight can be added for highlighting specific lines of code.
 * 
 * o2r-source contains the text that should be highlighted
 * o2r-line-highlight contains a string specifying the lines that should be highlighted. Allowed formats are
 * specified in the description of the "Line highlight" plugin of prism.js.
 * 
 * 
 * Examples:
 * (highlight code)
 * <pre o2r-code-highlight o2r-source="function foo(){\n var a = b; \n}"></pre>
 * 
 * (highlight code and highlight lines 5 and 7-12)
 * <pre o2r-code-highlight o2r-source="function foo(){\n var a = b; \n} o2r-line-highlight="5,7-12"></pre> 
 *  
 */
(function(){
    'use strict';
    angular
        .module('starter.o2rCodeHighlight')
        .directive('o2rCodeHighlight', o2rCodeHighlight);
    
    o2rCodeHighlight.$inject = ['$log', '$compile'];
    function o2rCodeHighlight($log, $compile){
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                o2rSource: '@',
                o2rLineHighlight: '@'
            },
            link: link,
            template: "<code></code>"
        };

        function link(scope, element, attrs, controller, transclude){
            scope.$watch('o2rSource', function(value){
                element.find('code').html(value);
                Prism.highlightElement(element.find('code')[0]);
            });

            scope.$watch('o2rLineHighlight', function(value){
                element[0].setAttribute('data-line', value);
                $compile(element.contents())(scope.$parent);
            });

            transclude(function(clone){
                if(clone.html() !== undefined){
                    element.find('code').html(clone.html());
                    $compile(element.contents())(scope.$parent);
                }
            });
        }
    }
})();