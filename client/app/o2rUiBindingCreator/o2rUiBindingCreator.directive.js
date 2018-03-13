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
    
    o2rUiBindingCreator.$inject = ['$log', '$window', '$document', '$http', '$mdDialog', 'env', 'o2rUiBindingCreatorHelper', 'icons', 'creationObject'];
    function o2rUiBindingCreator($log, $window, $document, $http, $mdDialog, env, o2rUiBindingCreatorHelper, icons, creationObject){
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
            scope.codefile = {path: scope.codefiles[0], lineHighlight: ''}; //only use first codefile so far
            
            
            scope.figures = ['Figure 1', 'Figure 2', 'Figure 3', 'Figure 4', 'Figure 5'];
            scope.purposes = [{text: 'Search for results using spatiotemporal properties', value:'discoverResult'}, 
                                {text: 'Show dataset and source code underlying a specific result in the text', value: 'showNumberDataCode'},
                                {text: 'Manipulate a parameter used to compute a specific numerical result in the text', value: 'manipulateNumber'},
                                {text: 'Manipulate a parameter used to compute a figure', value: 'manipulateFigure'}];
            scope.markCode = {};
            scope.markCodeDone = markCodeDone;
            scope.editMarkCode = editMarkCode;

            scope.markVariable = {};
            scope.markVariableDone = markVariableDone;
            scope.selectedVariable = {};
            scope.editMarkVariable = editMarkVariable;

            scope.widgets = {};
            scope.widgets.options = [{text: 'Slider', value:'slider'}, {text: 'Radio buttons', value:'radio'}];
            scope.sliderWidget = {};
            scope.widgets.selectedWidget = {};

            scope.selectionEvent = selectionEvent;
            scope.showOriginalCode = true;
            scope.selectedText = {};
            
            scope.openDialog = openDialog;
            scope.submit = submit;
            
            activate();
            
            scope.$watch('purposes.selected', function(newVal, oldVal){
                resetWidgets();
                resetMarkVariable();
                resetMarkCode();
                resetFigures();
                switch (newVal) {
                    case 'manipulateFigure':
                        manipulateFigure();
                    break;
                    default:
                    break;
                }
            });
            
            scope.$watch('figures.selected', function(newVal, oldVal){                
                if(newVal){
                    if(scope.markCode.show){
                        resetMarkCode();
                        resetMarkVariable();
                        resetWidgets();
                    }
                    scope.markCode.show = true;
                    //scope.steps.step6.type = newVal;
                }
            });

            scope.$watch('widgets.selected', function(newVal, oldVal){                
                if(newVal==='slider'){
                    scope.sliderWidget.show = true;
                    scope.widgets.selectedWidget = 'Slider';
                } else{
                    scope.sliderWidget.show = false;
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

            function manipulateFigure(){
                scope.figures.show = true;
            }

            function activate(){
                resetPurpose();
                resetFigures();
                resetMarkCode();
                resetWidgets();
                resetMarkVariable();
            }
            
            function prepareCodefiles(files){
                for(var i in files){
                    files[i] = env.api + '/compendium/' + scope.ercId + '/data/' + files[i];
                }
                return files;
            }

            function markCodeDone(){
                logger.info(selectedLinesIndex);
                scope.selectedText.source = o2rUiBindingCreatorHelper.mergeSelectedCode(selectedLinesIndex, codeText);
                scope.showOriginalCode = false;
                scope.markCode.showSelectedText = true;
                scope.markCode.disable = true;
                scope.markVariable.show = true;
            }
            
            function markVariableDone(){
                scope.markVariable.disable = true;
                scope.widgets.show = true;
                scope.widgets.showButton = true;
            }

            function selectionEvent(){
                if(scope.markCode.show && !scope.markVariable.show){
                    var selection = $window.getSelection().getRangeAt(0).toString();
                    if(selection.length != 0){
                        var lines = o2rUiBindingCreatorHelper.getSelectionLines(selection, codeText);
                        selectedLinesIndex = o2rUiBindingCreatorHelper.removeOverlap(lines, selectedLinesIndex);
                        scope.codefile.lineHighlight = o2rUiBindingCreatorHelper.setUpLineHighlight(selectedLinesIndex);
                        scope.markCode.disable = false;
                    }
                } else if(scope.markVariable.show && !scope.widgets.show){
                    var selection = $window.getSelection().toString();
                    if(selection.length != 0){
                        scope.selectedVariable = o2rUiBindingCreatorHelper.validateVariable(selection);
                        if(scope.selectedVariable){
                            scope.selectedVariable.line = o2rUiBindingCreatorHelper.getSelectionLines(selection, scope.selectedText.source);
                            scope.selectedText.lineHighlight = '' + scope.selectedVariable.line.start;
                            scope.markVariable.disable = false;
                        } else {
                            scope.selectedText.lineHighlight = '';
                            scope.markVariable.disable = true;
                        }
                        scope.markVariable.showSelection = true;
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
                scope.purposes.show = true;
                scope.purposes.selected = null;
            }

            function resetFigures(){
                scope.figures.selected = null;
            }

            function resetMarkCode(){
                scope.markCode.showSelectedText = false;
                scope.markCode.disable = true;
                scope.selectedText.source = '';
                scope.showOriginalCode = true;
                scope.markCode.showSelectedText = false;
                scope.markCode.show = false;
                selectedLinesIndex = [];
                scope.codefile.lineHighlight = '';
            }

            function resetWidgets(){
                scope.sliderWidget.show = false;
                scope.widgets.showButton = true;
                scope.widgets.type = null;
                scope.widgets.disable = true;
                scope.widgets.min_value = null;
                scope.widgets.max_value = null;
                scope.widgets.step_size = null;
                scope.widgets.init_value = null;
                scope.widgets.label = null;
                scope.widgets.selected = null;
                scope.widgets.show = false;
            }
            
            function resetMarkVariable(){
                scope.markVariable.showSelection = false;
                scope.markVariable.disable = true;
                scope.markVariable.show = false;
                scope.selectedVariable = {};
                scope.selectedText.lineHighlight = '';
            }

            function editMarkCode(){
                resetWidgets();
                resetMarkVariable();
                scope.selectedText.source = '';
                scope.markCode.showSelectedText = false;
                scope.showOriginalCode = true;
                scope.markCode.show = true;
                selectedLinesIndex = [];
            }

            function editMarkVariable(){
                resetWidgets();
                scope.selectedVariable = {};
                scope.selectedText.lineHighlight = '';
            }

            function submit(){
                var binding = {};
                    binding.purpose = scope.purposes.selected;
                    binding.task = 'manipulation';
                    binding.figure = scope.figures.selected;
                    binding.codeLines = selectedLinesIndex;
                    binding.variable = scope.selectedVariable;
                    binding.widget = {
                        'type': scope.widgets.selectedWidget,
                        'min': scope.widgets.min_value,
                        'max': scope.widgets.max_value,
                        'init': scope.widgets.init_value,
                        'step': scope.widgets.step_size,
                        'label': scope.widgets.label
                    }
                creationObject.addBinding(binding);        
            }

        }  
    }
})();