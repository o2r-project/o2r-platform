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
                                    'icons', 'creationObject', 'httpRequests'];
    function o2rUiBindingCreator($log, $window, $document, $http, $mdDialog, env, o2rUiBindingCreatorHelper, 
                                    icons, creationObject, httpRequests){
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

            scope.codefile = {
                path: env.api + '/compendium/' + scope.ercId + '/data/' + scope.erc.mainfile, 
                lineHighlight: ''
            };
            scope.datafile = env.api + '/compendium/' + scope.ercId + '/data/' + scope.erc.inputfiles[0]; 

            scope.figures = {
                list: ['Figure 1', 'Figure 2', 'Figure 3', 'Figure 4', 'Figure 5'],
                show: false,
                selected: null
            };

            scope.purposes = {
                list: [{text: 'Show data and code underlying a figure', value: 'figureDataCode'},
                            {text: 'Manipulate a parameter used to compute a number', value: 'manipulateNumber'},
                            {text: 'Manipulate a parameter used to compute a figure', value: 'figure'}],
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
                edit: editData
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
                options: [{text: 'Slider', value:'slider'}, {text: 'Radio buttons', value:'radio'}, {text: 'Text input', value:'textinput'}],
                selected: {},
                slider: {
                    show: false,
                    min_value: null,
                    max_value: null,
                    step_size: null,
                    init_value: null,
                    label: null
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
                doneData: {
                    disable: true
                },
                editData: {
                    disable: true
                }
            }

            scope.selectionEvent = selectionEvent;
            scope.showOriginalCode = true;
            scope.selectedText = {};
            scope.showOriginalData = false;
            
            scope.openDialog = openDialog;
            
            scope.readyForSubmission= false;
            scope.submit = submit;

            var lines, codeText;
            var selectedLinesIndex = [];
            
            activate();
            
            scope.$watch('purposes.selected', function(newVal, oldVal){
                resetWidgets();
                resetMarkVariable();
                resetMarkCode();
                resetFigures();
                switch (newVal) {
                    case 'figure':
                        scope.purposes.selected = newVal;
                        scope.figures.show = true;
                        break;
                    case 'figureDataCode':
                        scope.purposes.selected = newVal;
                        scope.figures.show = true;
                        break;
                    default:
                    break;
                }
            });
            
            scope.$watch('figures.selected', function(newVal, oldVal){                
                if(newVal){
                    if(scope.purposes.selected === 'figure' || scope.purposes.selected === 'figureDataCode'){
                        scope.code.mark.show = true;
                        scope.buttons.cutCode.show = true;
                        scope.buttons.editCode.show = true;
                        scope.buttons.doneCode.show = true;
                    }
                }
            });

            scope.$watch('widgets.selected', function(newVal, oldVal){                
                if (scope.purposes.selected === 'figure'){
                    if(newVal === 'slider'){
                        scope.widgets.slider.show = true;
                        //scope.widgets.selected = 'Slider';
                    } else{
                        scope.widgets.slider.show = false;
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
                scope.buttons.doneData.disable = !atLeastOneSelectedColumn;
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
                scope.buttons.doneData.disable = !scope.buttons.doneData.disable;
            }

            //////////////////
            function activate(){
                resetPurpose();
                resetFigures();
                resetMarkCode();
                resetWidgets();
                resetMarkVariable();
                getHeader(scope.datafile);
            }

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
            }

            function cutCode(){
                logger.info(selectedLinesIndex);
                scope.selectedText.source = o2rUiBindingCreatorHelper.mergeSelectedCode(selectedLinesIndex, codeText);
                scope.showOriginalCode = false;
                scope.code.mark.showSelectedText = true;
                //scope.code.mark.disable = true;
                scope.buttons.editCode.disable = false;
                scope.buttons.cutCode.disable = true;
                scope.buttons.doneCode.disable = false;
            }

            function confirmCode(){
                scope.buttons.doneCode.disable = true;
                scope.buttons.cutCode.disable = true;
                scope.buttons.editCode.disable = false;
                if (scope.purposes.selected === 'figure'){
                    scope.variable.mark.show = true;
                } else if (scope.purposes.selected === 'figureDataCode'){
                    scope.code.mark.extracted = true;
                    scope.showOriginalCode = false;
                    scope.code.mark.showSelectedText = false;
                    scope.showOriginalData = true;
                    scope.data.show = true;
                }                
            }
            
            function confirmData(){
                scope.readyForSubmission = true;
                scope.buttons.doneData.disable = true;
                scope.buttons.editData.disable = false;
            }

            function markVariableDone(){
                scope.variable.mark.disable = true;
                if (scope.purposes.selected === 'figure'){
                    scope.widgets.show = true;
                    scope.widgets.showButton = true;
                }
            }

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
                scope.code.mark.showSelectedText = false;
                scope.selectedText.source = '';
                scope.showOriginalCode = true;
                scope.code.mark.show = false;
                scope.buttons.doneCode.disable = true;
                selectedLinesIndex = [];
                scope.codefile.lineHighlight = '';
            }

            function resetWidgets(){
                scope.widgets.slider.show = false;
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
                scope.variable.mark.showSelection = false;
                scope.variable.mark.disable = true;
                scope.variable.mark.show = false;
                scope.variable.selected = {};
                scope.selectedText.lineHighlight = '';
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
                scope.buttons.doneData.disable = false;
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
                    binding.mainfile = erc.metadata.o2r.mainfile;
                    binding.purpose = scope.purposes.selected;
                    binding.task = getTask(binding.purpose);
                    binding.figure = scope.figures.selected;
                    //binding.codeLines = selectedLinesIndex;
                    binding.codeLines = tempFunc();
                    if (binding.purpose === 'figureDataCode'){
                        binding.dataset = {
                            file: scope.datafile.path.split('/').pop(),
                            columns: getSelectedColumns()
                        }        
                    }else if(binding.purpose === 'figure'){
                        binding.variable = scope.variable.selected;
                        binding.widget = {
                            'type': scope.widgets.selected,
                            'min': scope.widgets.slider.min_value,
                            'max': scope.widgets.slider.max_value,
                            'init': scope.widgets.slider.init_value,
                            'step': scope.widgets.slider.step_size,
                            'label': scope.widgets.slider.label
                        }
                    }

                httpRequests.sendBinding(binding).then(function(data){
                    console.log(data);
                    creationObject.addBinding(data.data.data);
                });
            }

            function getTask(purpose){
                if (purpose === 'figure') {
                    return 'manipulate';
                }else if(purpose === 'figureDataCode'){
                    return 'inspect'
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

            function tempFunc() {
                let lines = '[{"start":25,"end":26},{"start":30,"end":30},{"start":34,"end":34},{"start":39,"end":40},{"start":122,"end":122},{"start":123,"end":124},{"start":125,"end":125},{"start":129,"end":129},{"start":133,"end":136},{"start":140,"end":141},{"start":153,"end":153},{"start":163,"end":164},{"start":169,"end":170},{"start":171,"end":172},{"start":173,"end":174},{"start":178,"end":178},{"start":190,"end":191},{"start":195,"end":201},{"start":205,"end":208},{"start":212,"end":214},{"start":218,"end":219},{"start":230,"end":230},{"start":241,"end":241},{"start":250,"end":252},{"start":256,"end":259},{"start":263,"end":266},{"start":270,"end":270},{"start":274,"end":276},{"start":278,"end":278},{"start":282,"end":283},{"start":287,"end":287},{"start":292,"end":292},{"start":310,"end":313},{"start":317,"end":318},{"start":322,"end":322},{"start":326,"end":328},{"start":332,"end":335},{"start":338,"end":339},{"start":340,"end":340}]';
                return JSON.parse(lines);
            }
        }  
    }
})();