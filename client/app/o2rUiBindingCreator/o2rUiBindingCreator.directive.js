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
    
    o2rUiBindingCreator.$inject = ['$log', '$window', '$document', '$http', '$mdDialog', 'env', 'o2rUiBindingCreatorHelper', 
                                    'icons', 'creationObject', 'httpRequests', '$mdToast', 'o2rUiBindingExamples'];
    function o2rUiBindingCreator($log, $window, $document, $http, $mdDialog, env, o2rUiBindingCreatorHelper, 
                                    icons, creationObject, httpRequests, $mdToast, o2rUiBindingExamples){
        return{
            restrict: 'E',
            scope: {
                erc: '@o2rErc',
                ercId: '@o2rErcId'
            },
            templateUrl: 'app/o2rUiBindingCreator/o2rUiBindingCreator.template.html',
            link: link
        };

        function link(scope, element, attrs){
            var logger = $log.getInstance('o2rUiBindingCreator');
            scope.erc = JSON.parse(scope.erc);
            scope.icons = icons;
            scope.preselectedCode;            

            scope.paper = {
                path: env.api + '/compendium/' + scope.ercId + '/data/' + scope.erc.displayfile,
                type: 'text/html'
            };

            scope.codefile = {
                path: env.api + '/compendium/' + scope.ercId + '/data/' + scope.erc.mainfile, 
                lineHighlight: ''
            };

            scope.datafile = env.api + '/compendium/' + scope.ercId + '/data/' + scope.erc.inputfiles[0];
            $http.get(scope.datafile).then(function(response){
                scope.slider = {
                    minValue: 1,
                    maxValue: response.data.split(/\r\n|\n/).length,
                    options: {
                        floor:1,
                        ceil: response.data.split(/\r\n|\n/).length,
                        step: 1,
                        noSwitching: true
                    },
                    from: undefined,
                    to: undefined
                };
            }); 

            scope.figures = {
                list: ['All', 'Figure 1', 'Figure 1a', 'Figure 1b', 'Figure 1c', 'Figure 1d', 'Figure 2', 'Figure 2a', 'Figure 2b', 'Figure 2c', 'Figure 2d', 'Figure 3', 'Figure 3a', 'Figure 3b', 'Figure 3c', 
                        'Figure 4','Figure 4a', 'Figure 4b', 'Figure 4c', 'Figure 4d', 'Figure 4e', 'Figure 4f', 'Figure 5', 'Figure 6', 'Figure 6a', 'Figure 6b', 'Figure 7', 'Figure 8', 'Figure 8a', 'Figure 8b',
                        'Figure 9', 'Figure 9a', 'Figure 9b', 'Figure 10', 'Figure 10a', 'Figure 10b', 'Figure 10c', 'Figure 11', 'Figure 12', 'Figure 13' , 'Figure 13a' , 'Figure 13b', 'Figure 14' , 'Figure 14a' , 'Figure 14b', 
                        'Figure 15', 'Figure 16', 'Figure 17', 'Figure 17a', 'Figure 17b'],
                show: false,
                selected: null
            };

            scope.purposes = {
                list: [ {text: 'Show data and code underlying a figure', value: 'inspectCodeDataFigure'},
                        {text: 'Show data and code underlying a number', value: 'inspectCodeDataNumber'},
                        {text: 'Manipulate the parameter underlying a figure', value: 'manipulateFigure'},
                        {text: 'Manipulate the parameter underlying a number', value: 'manipulateNumber'}],
                show: true,
                selected: null
            };
            
            scope.code = {
                mark: {
                    showSelectedText: false,
                    extracted: false,
                    show: false
                },
                cut: cutCode,
                edit: editCode,
                confirm: confirmCode
            };

            scope.data = {
                show: false,
                selected: getHeader,
                header: null,
                selectedColumns: [],
                confirm: confirmData,
                all: false,
                edit: editData,
                doneDataButtonDisable: true,
                editDataButtonDisable: true
            };

            scope.variable = {
                mark: {
                    show: false,
                    disable: false,
                    showSelection: false
                },
                done: markVariableDone,
                selected: {
                    text: '',
                    varName: '',
                    val: ''
                },
                edit: editMarkVariable
            };

            scope.widgets = {
                options: [{text: 'Slider', value:'slider'}, {text: 'Radio buttons', value:'radio'}],
                selected: {},
                slider: {
                    show: false,
                    min_value: null,
                    max_value: null,
                    step_size: null,
                    label: null
                },
                radio: {
                    show: false,
                    options: []
                },
                show: false,
                showButton: false,
                type: null,
                disable: false
            };

            scope.buttons = {
                cutCode: {
                    show: false,
                    disable: true
                },
                editCode: {
                    show: false,
                    disable: true
                },
                doneCode: {
                    show: false,
                    disable: true
                },
                editData: {
                    disable: true
                }
            }

            scope.selectionEvent = selectionEvent;
            scope.showOriginalCode = false;
            scope.showPaper = true;
            scope.selectedText = {};
            scope.showOriginalData = false;
            
            scope.openDialog = openDialog;
            
            scope.readyForSubmission= false;
            scope.submit = submit;

            var lines, codeText;
            var selectedLinesIndex = [];
            
            resetAll();
            
            scope.$watch('purposes.selected', function(newVal, oldVal){
                resetWidgets();
                resetMarkVariable();
                resetMarkCode();
                resetFigures();
                resetData();
                scope.showPaper = true;
                switch (newVal) {
                    case 'manipulateFigure':
                        scope.purposes.selected = newVal;
                        scope.figures.show = true;
                        break;
                    case 'inspectCodeDataFigure':
                        scope.purposes.selected = newVal;
                        scope.figures.show = true;
                        break;
                    default:
                    break;
                }
            });
            
            scope.$watch('figures.selected', function(newVal, oldVal){                
                if(newVal){
                    if(scope.purposes.selected === 'manipulateFigure' || scope.purposes.selected === 'inspectCodeDataFigure'){
                        scope.showPaper = false;
                        scope.showOriginalCode = true;
                        scope.code.mark.show = true;
                        scope.buttons.cutCode.show = true;
                        scope.buttons.editCode.show = true;
                        scope.buttons.doneCode.show = true;
                    }
                }
                scope.preselectedCode = o2rUiBindingExamples.findPaper(JSON.parse(scope.erc).title, newVal);
            });

            scope.$watch('widgets.selected', function(newVal, oldVal){                
                if (scope.purposes.selected === 'manipulateFigure'){
                    if(newVal === 'slider'){
                        scope.widgets.radio.show = false;
                        scope.widgets.slider.show = true;
                    } else if(newVal === 'radio'){
                        scope.widgets.slider.show = false;
                        scope.widgets.radio.show = true;
                    }                        
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

            scope.addItem = function(item) {
                scope.data.header[item].selected = scope.data.header[item].selected;
                var atLeastOneSelectedColumn = false;
                scope.data.header.forEach(element => {
                    if (element.selected){
                        console.log(element.selected);
                        atLeastOneSelectedColumn = true; 
                    }
                });
                scope.data.doneDataButtonDisable = !atLeastOneSelectedColumn;
            };

            scope.toggleAll = function(){
                if(scope.data.all){
                    scope.data.header.forEach(element => {
                        element.selected = true;
                    });
                }else {
                    scope.data.header.forEach(element => {
                        element.selected = false;
                    });
                }
                scope.data.doneDataButtonDisable = !scope.data.doneDataButtonDisable;
            };

            function getHeader(file){
                scope.datafile = {path: file, lineHighlight: '', type: 'text/csv'};
                httpRequests.getCSV(scope.datafile.path)
                .then(function(res){
                    scope.data.header = res.data.replace('"','').replace(/"/g,'').split('\n')[0].split(',');
                    scope.data.header.shift();
                    var temp = [];    
                    scope.data.header.forEach(element => {
                        temp.push({name: element, selected: false});
                    });
                    scope.data.header = temp;
                });
            };

            function cutCode(){
                logger.info(selectedLinesIndex);
                scope.selectedText.source = o2rUiBindingCreatorHelper.mergeSelectedCode(selectedLinesIndex, codeText);
                scope.showOriginalCode = false;
                scope.code.mark.showSelectedText = true;
                //scope.code.mark.disable = true;
                scope.buttons.editCode.disable = false;
                scope.buttons.cutCode.disable = true;
                scope.buttons.doneCode.disable = false;
            };

            function confirmCode(){
                scope.buttons.doneCode.disable = true;
                scope.buttons.cutCode.disable = true;
                scope.buttons.editCode.disable = false;
                if (scope.purposes.selected === 'manipulateFigure'){
                    scope.variable.mark.show = true;
                } else if (scope.purposes.selected === 'inspectCodeDataFigure'){
                    scope.code.mark.extracted = true;
                    scope.showOriginalCode = false;
                    scope.code.mark.showSelectedText = false;
                    scope.showOriginalData = true;
                    scope.data.show = true;
                }                
            };
            
            function confirmData(){
                scope.readyForSubmission = true;
                scope.data.doneDataButtonDisable = true;
                scope.buttons.editData.disable = false;
            };

            function markVariableDone(){
                scope.variable.mark.disable = true;
                if (scope.purposes.selected === 'manipulateFigure'){
                    scope.widgets.show = true;
                    scope.widgets.showButton = true;
                }
            };

            function selectionEvent(){
                if(scope.code.mark.show && !scope.variable.mark.show){
                    var selection = $window.getSelection().getRangeAt(0).toString();
                    if(selection.length != 0){
                        var lines = o2rUiBindingCreatorHelper.getSelectionLines(selection, codeText);
                        selectedLinesIndex = o2rUiBindingCreatorHelper.removeOverlap(lines, selectedLinesIndex);
                        scope.codefile.lineHighlight = o2rUiBindingCreatorHelper.setUpLineHighlight(selectedLinesIndex);
                        scope.buttons.cutCode.disable = false;
                    }
                } else if(scope.variable.mark.show && !scope.widgets.show){
                    var selection = $window.getSelection().toString();
                    if(selection.length != 0){
                        scope.variable.selected = o2rUiBindingCreatorHelper.validateVariable(selection);
                        if(scope.variable.selected){
                            scope.variable.selected.line = o2rUiBindingCreatorHelper.getSelectionLines(selection, scope.selectedText.source);
                            scope.selectedText.lineHighlight = '' + scope.variable.selected.line.start;
                            scope.variable.mark.disable = false;
                            scope.variable.selected.text = selection;
                        } else {
                            scope.selectedText.lineHighlight = '';
                            scope.variable.mark.disable = true;
                        }
                        scope.variable.mark.showSelection = true;
                    }
                }
            };
            
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

            function editCode(){
                resetWidgets();
                resetMarkVariable();
                scope.buttons.doneCode.disable = false;
                scope.buttons.editCode.disable = true;
                scope.selectedText.source = '';
                scope.code.mark.showSelectedText = false;
                scope.showOriginalCode = true;
                scope.code.mark.show = true;
                scope.code.mark.extracted = false;
                scope.showOriginalData = false;
                selectedLinesIndex = [];
            }

            function editData(){
                scope.data.doneDataButtonDisable = false;
                scope.buttons.editData.disable = true;
                scope.readyForSubmission = false;
            }

            function editMarkVariable(){
                resetWidgets();
                scope.variable.selected = {};
                scope.selectedText.lineHighlight = '';
            }

            function submit(){
                var erc = creationObject.get();
                var binding = {};
                    binding.id = erc.id;
                    binding.purpose = scope.purposes.selected;

                    binding.code = {};
                    binding.code.file = erc.metadata.o2r.mainfile; 
                    binding.code.codeLines = scope.preselectedCode;

                    if (binding.purpose === 'inspectCodeDataFigure'){
                        binding.result = {};
                        binding.result.type = 'figure',
                        binding.result.value = scope.figures.selected;
                        binding.dataset = {
                            file: scope.datafile.path.split('/').pop(),
                            columns: getSelectedColumns(),
                            rows: scope.slider.minValue + "-" + scope.slider.maxValue
                        }        
                    }else if(binding.purpose === 'manipulateFigure'){
                        binding.result = {};
                        binding.result.type = 'figure',
                        binding.result.value = scope.figures.selected;
                        binding.code.parameter = scope.variable.selected;
                        binding.code.parameter.widget = getWidget();
                    }
                    console.log(binding)
                    httpRequests.listAllCompendia().then(function(data){
                        let port = getNumber(data.data.results, erc.id);
                        if(port == undefined){
                            console.log("No more ports available.")
                        }else{
                            binding.port = "5" + port +  + erc.metadata.o2r.interaction.length; 
                            httpRequests.sendBinding(binding).then(function(data){
                                console.log(data);
                                creationObject.addBinding(data.data.data);
                                showToast(data.statusText);
                            });
                            }
                    });
            }

            function showToast(status){
                if (status == 'OK'){
                    var text = 'Saved bundle successfully. Please click UPDATE';
                    var toastClass = 'creationProcess-success-toast';
                }else{
                    var text = 'Could not save output bundle';
                    var toastClass = 'creationProcess-failure-toast';
                }
                        
                $mdToast.show(
                    $mdToast
                        .simple()
                        .textContent(text)
                        .position('bottom right')
                        .toastClass(toastClass)
                        .hideDelay(3000)
                        .parent($document[0].body.children.main.children["ui-view"])
                );
            }

            function getNumber(res, ercid){
                let slot=undefined;
                for(let i=0; i<res.length; i++){
                    if(res[i]===ercid){
                        slot = i.toString();
                        console.log("found: " + slot + " " + ercid) 
                    }
                }
                if(slot.length < 2){
                    slot = 0 + slot.toString();
                }
                if(slot.length > 2 || Number(slot) > 49){
                    slot = undefined;
                }
                return slot;
            }

            function getWidget(){
                if (scope.widgets.selected == 'slider'){
                    return {
                        'type': scope.widgets.selected,
                        'min': scope.widgets.slider.min_value,
                        'max': scope.widgets.slider.max_value,
                        'step': scope.widgets.slider.step_size,
                        'label': scope.widgets.slider.label
                    }
                }else if(scope.widgets.selected == 'radio'){
                    return {
                        'type': scope.widgets.selected,
                        'options': scope.widgets.radio.options
                    }
                }
            }

            function getSelectedColumns(){
                var selectedColumns = [];
                scope.data.header.forEach(element => {
                    if (element.selected){
                        selectedColumns.push(element)
                    }
                });
                return selectedColumns;
            }

            function tempFunc(title, figure) {     

            }

            //////////////////
            function resetAll(){
                resetPurpose();
                resetFigures();
                resetMarkCode();
                resetData();
                resetWidgets();
                resetMarkVariable();
                scope.readyForSubmission = false;
                getHeader(scope.datafile);
            }            

            function resetPurpose(){
                scope.purposes.show = true;
                scope.purposes.selected = null;
            }

            function resetFigures(){
                scope.figures.selected = null;
            }

            function resetMarkCode(){
                scope.code.mark.showSelectedText = false;
                scope.selectedText.source = '';
                scope.showOriginalCode = false;
                scope.code.mark.show = false;
                scope.buttons.doneCode.disable = true;
                selectedLinesIndex = [];
                scope.codefile.lineHighlight = '';
            }

            function resetData(){
                scope.data.show = false;
                scope.showOriginalData = false;
                scope.data.selectedColumns = [];
            }

            function resetWidgets(){
                scope.widgets.slider.show = false;
                scope.widgets.showButton = true;
                scope.widgets.type = null;
                scope.widgets.disable = true;
                scope.widgets.min_value = null;
                scope.widgets.max_value = null;
                scope.widgets.step_size = null;
                scope.widgets.label = null;
                scope.widgets.selected = null;
                scope.widgets.show = false;
            }
            
            function resetMarkVariable(){
                scope.variable.mark.showSelection = false;
                scope.variable.mark.disable = true;
                scope.variable.mark.show = false;
                scope.variable.selected = {};
                scope.selectedText.lineHighlight = '';
            }

        }  
    }
})();