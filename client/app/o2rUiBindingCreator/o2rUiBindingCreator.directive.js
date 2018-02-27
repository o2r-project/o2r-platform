/**
 * Directive for the creation of ui bindings.
 * This directive contains the whole workflow for the creation of one new ui binding.
 * The directive can be called via
 * <o2r-ui-binding-creator></o2r-ui-binding-creator>
 * and expects a scope "o2r-codefiles" and "o2r-erc-id".
 * 
 * o2r-codefiles MUST be an array of Strings, where each string is a path to a single file within an ERC.
 * o2r-erc-id MUST be a String containing the id of an erc
 * 
 * Example:
 * 
 * <o2r-ui-binding-creator o2r-codefiles="["path/to/first/file", "path/to/second/file"]" o2r-erc-id="as43B"></o2r-ui-binding-creator>
 * 
 * Given that the calling controller has a scope variable vm.files = ["path/to/first/file", "path/to/second/file"]
 * and a scope variable vm.ercid = "as43B"
 * the directive can be called within the scope of that controller as follows
 * 
 * <o2r-ui-binding-creator o2r-codefiles="{{vm.files}}" o2r-erc-id="{{vm.ercid}}"></o2r-ui-binding-creator>
 */
(function(){
    'use strict';

    angular
        .module('starter.o2rUiBindingCreator')
        .directive('o2rUiBindingCreator', o2rUiBindingCreator);
    
    o2rUiBindingCreator.$inject = ["$log", "$window", "$document", "$http", "$mdDialog", "env", "o2rUiBindingCreatorHelper", "icons"];
    function o2rUiBindingCreator($log, $window, $document, $http, $mdDialog, env, o2rUiBindingCreatorHelper, icons){
        return{
            restrict: 'E',
            scope: {
                codefiles: '@o2rCodefiles',
                ercId: '@o2rErcId'
            },
            templateUrl: 'app/o2rUiBindingCreator/o2rUiBindingCreator.template.html',
            link: link
        };

        function link(scope, element, attrs){
            if(!scope.codefiles) throw 'o2r-codefiles is undefined';
            if(!scope.ercId) throw 'o2r-erc-id is undefined';

            var logger = $log.getInstance('o2rUiBindingCreator');
            var lines;
            var codeText;
            var selectedLinesIndex = [];
            scope.icons = icons;
            // turn string into array and then add actual path
            // NOTE: Remove the prepareCodefiles wrapper as soon as the paths are consistent
            scope.codefiles = prepareCodefiles(angular.fromJson(scope.codefiles));
            scope.codefile = {path: scope.codefiles[0], lineHighlight: ""}; //only use first codefile so far
            scope.figures = ["Figure 1", "Figure 2", "Figure 3", "Figure 4", "Figure 5"];
            //scope.markCodeDone = markCodeDone;
            //scope.sliderValuesDone = sliderValuesDone;
            scope.selectionEvent = selectionEvent;
            //scope.markVariableDone = markVariableDone;
            scope.showOriginalCode = true;
            scope.selectedText = {};
            scope.selectedVariable = {};
            scope.openDialog = openDialog;
            scope.submit = submit;
            //scope.markCodeEdit = markCodeEdit;
            //scope.markVariableEdit = markVariableEdit;
            
            scope.binding = {};
            scope.binding.purpose = {};
            scope.binding.figure = {};
            scope.binding.widget = {};
            scope.binding.code = {};
            scope.binding.markCode = {};
            scope.binding.markVariable = {};
            scope.binding.sliderValues = {};
            scope.binding.finish = {};
            
            activate();
            
            scope.$watch('binding.purpose.selected', function(newVal, oldVal){
                if(typeof newVal === 'number'){
                    /*if(scope.steps.step2.show){
                        //resetStep7();
                        resetStep6();
                        resetStep5();
                        resetStep4();
                        resetStep3();
                        resetStep2();
                    }*/
                    switch (newVal) {
                        case 0:
                            showFigureCode();
                        break;
                        default:
                        break;
                    }
                }
            });
            
            scope.$watch('binding.figure.selected', function(newVal, oldVal){
                if(typeof newVal === 'number'){
                    /*if(scope.steps.step3.show){
                        resetStep6();
                        resetStep4();
                        resetStep5();
                        resetStep3();
                    }*/
                    //scope.steps.step3.show = true;
                    //scope.steps.step6.type = newVal;
                }
            });

            scope.$watch('codefile', function(newVal, oldVal){
                $http.get(newVal.path)
                .then(function(response){
                    codeText = o2rUiBindingCreatorHelper.removeCarriage(response.data);
                })
                .catch(function(err){
                    logger.error(err);
                });
            });

            //////////////////

            function showFigureCode(){
                scope.binding.figure.show = true;
                scope.binding.markCode.show = true;
                scope.binding.code = true;
            }

            function activate(){
                resetPurpose();
                /*resetStep1();
                resetStep2();
                resetStep3();
                resetStep4();
                resetStep5();*/
            }
            
            function prepareCodefiles(files){
                // for(var i in files){
                //     var parts = files[i].split('/');
                //     var result = '';
                //     for(var j in parts){
                //         if(j==0) result += env.api + '/compendium/' + parts[j] + '/data';
                //         else result += '/' + parts[j];
                //     }
                //     files[i] = result;
                // }
                for(var i in files){
                    files[i] = env.api + '/compendium/' + scope.ercId + '/data/' + files[i];
                }
                return files;
            }

            function markCodeDone(){
                logger.info(selectedLinesIndex);
                scope.selectedText.source = o2rUiBindingCreatorHelper.mergeSelectedCode(selectedLinesIndex, codeText);
                scope.showOriginalCode = false;
                scope.steps.step4.showSelectedText = true;
                scope.steps.step4.disable = true;
                scope.steps.step5.show = true;
            }
            
            /*function step5Done(){
                scope.steps.step5.disable = true;
                scope.steps.step6.show = true;
                scope.steps.step6.showButton = true;
            }

            function step6Done(){
                scope.steps.step6.showButton = false;
            }*/

            function selectionEvent(){
                // only check selection if we are in step 3 or 4
                
                // check selection for step 3
                if(scope.steps.step4.show && !scope.steps.step5.show){
                    // var selection = $window.getSelection().toString();
                    var selection = $window.getSelection().getRangeAt(0).toString();
                    // ignore click events
                    if(selection.length != 0){
                        var lines = o2rUiBindingCreatorHelper.getSelectionLines(selection, codeText);
                        selectedLinesIndex = o2rUiBindingCreatorHelper.removeOverlap(lines, selectedLinesIndex);
                        scope.codefile.lineHighlight = o2rUiBindingCreatorHelper.setUpLineHighlight(selectedLinesIndex);
                        scope.steps.step4.disable = false;
                    }
                    // check selection for step 4
                } else if(scope.steps.step5.show && !scope.steps.step6.show){
                    var selection = $window.getSelection().toString();
                    // scope.steps.step4.result.selection = selection;
                    if(selection.length != 0){
                        scope.selectedVariable = o2rUiBindingCreatorHelper.validateVariable(selection);
                        // if selection is valid assign values to scope variable
                        if(scope.selectedVariable){
                            scope.selectedVariable.line = o2rUiBindingCreatorHelper.getSelectionLines(selection, scope.selectedText.source);
                            scope.selectedText.lineHighlight = "" + scope.selectedVariable.line.start;
                            scope.steps.step5.disable = false;
                        } else {
                            scope.selectedText.lineHighlight = "";
                            scope.steps.step5.disable = true;
                        }
                        // show information in the frontend regardless of valid/invalid selection
                        scope.steps.step5.showSelection = true;
                    }
                }
            }
            
            function openDialog(ev){
                $mdDialog.show({
                    controller: function($mdDialog, icons){
                        this.parent = scope;
                        this.icons = icons;
                        this.cancel = () => $mdDialog.cancel();
                        this.file = {
                            path: 'https://markuskonkol.shinyapps.io/interactiveFigure1/',
                            type: 'text/shiny'
                        };
                    },
                    controllerAs: 'vm',
                    templateUrl: 'app/o2rUiBindingCreator/o2rUiBindingSummary.template.html',
                    parent: $document[0].body,
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                });
            }

            function resetPurpose(){
                scope.binding.purpose.show = true;
                scope.binding.purpose.options = [{text: "Show code underlying a figure", value:0}, {text: "Show code underlying a result", value: 1}];
                scope.binding.purpose.selected = null;
                //scope.steps.step2.show = false;
                //scope.showOriginalCode = true;
            }

            function resetFigure(){
                scope.bidning.figure.selected = null;
            }
            /*
            function resetStep2(){
                scope.steps.step2.options = [{text: "Slider", value:0}, {text: "Radio buttons", value:1}];
                scope.steps.step2.selected = null;
                scope.steps.step3.show = false;
                scope.showOriginalCode = true;
            }
        
            function resetStep3(){
                scope.steps.step3.showSelectedText = false;
                scope.steps.step3.disable = true;
        
                scope.selectedText.source = "";
                scope.showOriginalCode = true;
                scope.steps.step3.showSelectedText = false;
                scope.steps.step4.show = false;
                selectedLinesIndex = [];
                scope.codefile.lineHighlight = "";
            }
        
            function resetStep4(){
                scope.steps.step4.showSelection = false;
                scope.steps.step4.disable = true;
                scope.steps.step5.show = false;
                scope.selectedVariable = {};
                scope.selectedText.lineHighlight = "";
            }
        
            function resetStep5(){
                scope.steps.step5.showButton = true;
                scope.steps.step5.type = null;
                scope.steps.step5.disable = true;
                scope.steps.step5.min_value = null;
                scope.steps.step5.max_value = null;
                scope.steps.step5.step_size = null;
            }

            function resetStep6(){

            }

            function editStep3(){
                resetStep5();
                resetStep4();
                resetStep3();
            }

            function editStep4(){
                resetStep5();
                resetStep4();
            }

            function editStep5(){
                //resetStep5();
                //resetStep4();
            }            
            */
            function submit(){
                var result = {};
                // TODO
                // Add creation of final object containing all required information of a figure here
                // Wait until the structure of this object was specified.
                // Call http request to submit metadata of figure
            }
        }  
    }
})();