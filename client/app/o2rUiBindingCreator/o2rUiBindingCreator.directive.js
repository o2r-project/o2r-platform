/**
 * Directive for the creation of ui bindings.
 * This directive contains the whole workflow for the creation of one new uibinding.
 * The directive can be called via
 * <o2r-ui-binding-creator></o2r-ui-binding-creator>
 * and expects a scope "o2r-codefiles".
 * 
 * o2r-codefiles MUST be an array of Strings, where each string is a path to a single file within an ERC.
 * 
 * Example:
 * 
 * <o2r-ui-binding-creator o2r-codefiles="["path/to/first/file", "path/to/second/file"]"></o2r-ui-binding-creator>
 * 
 * Given that the calling controller has a scope variable vm.files = ["path/to/first/file", "path/to/second/file"]
 * the directive can be called within the scope of that controller as follows
 * 
 * <o2r-ui-binding-creator o2r-codefiles="{{vm.files}}"></o2r-ui-binding-creator>
 */
(function(){
    'use strict';

    angular
        .module('starter.o2rUiBindingCreator')
        .directive('o2rUiBindingCreator', o2rUiBindingCreator);
    
    o2rUiBindingCreator.$inject = ["$log", "$window", "$document", "$http", "env"];
    function o2rUiBindingCreator($log, $window, $document, $http, env){
        return{
            restrict: 'E',
            scope: {
                codefiles: '@o2rCodefiles' 
            },
            templateUrl: 'app/o2rUiBindingCreator/o2rUiBindingCreator.template.html',
            link: link
        };

        function link(scope, element, attrs){
            if(!scope.codefiles) throw 'o2r-codefiles is undefined';

            var logger = $log.getInstance('o2rUiBindingCreator');
            var lines;
            var codeText;
            var selectedLinesIndex = [];
            // turn string into array and then add actual path
            // NOTE: Remove the prepareCodefiles wrappe as soon as the paths are consistent
            scope.codefiles = prepareCodefiles(angular.fromJson(scope.codefiles));
            scope.codefile = {path: scope.codefiles[0], lineHighlight: ""}; //only use first codefile so far
            scope.figures = ["Figure 1", "Figure 2", "Figure 3", "Figure 4", "Figure 5"];
            scope.step3Done = step3Done;
            scope.step5Done = step5Done;
            scope.selectionEvent = selectionEvent;
            scope.updateValue = updateValue;
            
            scope.steps = {};
            scope.steps.step1 = {};
            scope.steps.step2 = {};
            scope.steps.step3 = {};
            scope.steps.step4 = {};
            scope.steps.step5 = {};
            
            scope.steps.step1.show = true;
            scope.steps.step2.show = false;
            scope.steps.step3.show = false;
            scope.steps.step4.show = false;
            scope.steps.step5.show = false;
            
            scope.steps.step1.options = [{text: "Change a variable", value:0}, {text: "other", value: 1}];
            scope.steps.step1.selected = null;
            
            scope.steps.step2.options = [{text: "Slider", value:0}, {text: "Switch", value:1}];
            scope.steps.step2.selected = null;
            
            scope.steps.step4.result = {};
            scope.steps.step4.result.show = false;
            
            scope.$watch('steps.step1.selected', function(newVal, oldVal){
                if(typeof newVal === 'number'){
                    switch (newVal) {
                        case 0:
                        scope.steps.step2.show = true;
                        break;
                        default:
                        break;
                    }
                }
            });
            
            scope.$watch('steps.step2.selected', function(newVal, oldVal){
                if(typeof newVal === 'number'){
                    switch (newVal) {
                        case 0:
                        scope.steps.step3.show = true;
                        scope.steps.step5.type = newVal;
                    }
                }
            });
            
            scope.$watch('codefile', function(newVal, oldVal){
                $http.get(newVal.path)
                .then(function(response){
                    codeText = removeCarriage(response.data);
                    scope.testfile = {source: codeText};
                })
                .catch(function(err){
                    logger.error(err);
                });
            });

            //////////////////
            
            function prepareCodefiles(files){
                for(var i in files){
                    var parts = files[i].split('/');
                    var result = '';
                    for(var j in parts){
                        if(j==0) result += env.api + '/compendium/' + parts[j] + '/data';
                        else result += '/' + parts[j];
                    }
                    files[i] = result;
                }
                return files;
            }

            function getSelectionLines(selection){
                        var selectionLines = selection.split("\n");
                        var inverseSelection = codeText.split(selection);
                        var pre = inverseSelection[0].split("\n");
                        var selectionEndLine = pre.length + selectionLines.length -1;
                        
                        if(selectionLines[selectionLines.length -1] == ""){
                            selectionEndLine -= 1;
                            logger.info('empty string at end');
                        }
                        var result = {
                            start: pre.length,
                            end: selectionEndLine
                        };
                        return result;
            }


            function step3Done(){
                logger.info(selectedLinesIndex);
                scope.steps.step4.show = true;
            }

            function updateValue(){
                var selection = $window.getSelection().toString();
                logger.info(selection);
                var value = parseFloat(selection);
                if(isNaN(value)){
                    throw "Value not a number";
                } else {
                    scope.steps.step4.result.value = value;
                    scope.steps.step4.result.show = true;
                    scope.steps.step5.show = true;
                }
            }

            function step5Done(){

            }

            function removeCarriage(text){
                var noR = text.split("\r");
                var newtext = "";
                for(var i in noR){
                    newtext += noR[i];
                }
                logger.info('removed carriage');
                return newtext;
            }

            function selectionEvent(){
                // only check selection if we are in step 3
                if(scope.steps.step3.show && !scope.steps.step4.show){
                    var selection = $window.getSelection().toString();
                    // ignore click events
                    if(selection.length != 0){
                        var lines = getSelectionLines(selection);
                        selectedLinesIndex.push(lines);
                        logger.info(selectedLinesIndex);
                        // check if it is the first marked line
                        if(scope.codefile.lineHighlight.length === 0){
                            // check if only one line was marked
                            if(lines.end === lines.start) scope.codefile.lineHighlight = lines.start + "";
                            else scope.codefile.lineHighlight = lines.start + "-" + lines.end;
                        } else {
                            if(lines.end === lines.start) scope.codefile.lineHighlight += "," + lines.start + "";
                            else scope.codefile.lineHighlight += ',' + lines.start + "-" + lines.end;
                        }
                    }
                }
            }
        }  
    }
})();