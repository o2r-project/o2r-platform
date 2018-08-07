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
                list: ['Figure 1', 'Figure 2', 'Figure 3', 'Figure 4', 'Figure 5', 'Figure 6', 'Figure 7', 'Figure 8',
                        'Figure 9', 'Figure 10', 'Figure 11', 'Figure 12'],
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
                    binding.code.codeLines = tempFunc(erc.metadata.o2r.title, scope.figures.selected);

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
                            });
                            }
                    });
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
                let papers = [
                    {
                    'title': 'Geochronological database and classification system for age uncertainties in Neotropical pollen records',
                    'figure': 'Figure 2',
                    'lines' : '[{"start":29,"end":285}, {"start":290,"end":1352}, {"start":1357,"end":1372}, {"start":1377,"end":1377}]'
                    },
                    {
                    'title': 'A Bayesian posterior predictive framework for weighting ensemble regional climate models',
                    'figure': 'Figure 4',
                    'lines' : '[{"start":27,"end":32}, {"start":36,"end":42}, {"start":51,"end":57}, {"start":64,"end":64}, {"start":66,"end":117}, {"start":123,"end":179}, {"start":192,"end":195}]'
                    },
                    {
                    'title': 'A question driven socio-hydrological modeling process',
                    'figure': 'Figure 6',
                    'lines': '[{"start":28,"end":34}, {"start":36,"end":144}]'
                    },
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 1',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":118,"end":143}]'
                    },
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 2',
                    'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":63}, {"start":81,"end":82}, {"start":98,"end":99}, {"start":101,"end":112}, {"start":118,"end":119}, {"start":2447,"end":2447}, {"start":2618,"end":2638}]'
                    },
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 3',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":2007,"end":2168}, {"start":1195,"end":1356}, {"start":1362,"end":1388}, {"start":1394,"end":1394}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2351,"end":2377}, {"start":2554,"end":2559}]'
                    },
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 4',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":827}]'
                    },
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 5',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":93}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":509}, {"start":805,"end":812}, {"start":1195,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1480,"end":1492}]'
                    },
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 6',
                    'lines': '[{"start":24,"end":27}, {"start":46,"end":47}, {"start":60,"end":63}, {"start":98,"end":112}, {"start":711,"end":711}, {"start":805,"end":812}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2328,"end":2344}]'
                    },/*Figure 8a
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 8',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2675,"end":2686}]'
                    },*/                        
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 8',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2687,"end":2698}]'
                    },
                    /*Figure9a{
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 9',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2742,"end":2751}, {"start":2760,"end":2765}, {"start":2772,"end":2792}]'
                    }Figure9b*/{
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 9',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2742,"end":2751}, {"start":2760,"end":2765}, {"start":2772,"end":2774}, {"start":2799,"end":2823}]'
                    },
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 10',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2701,"end":2712}]'
                    },/*Figure 10b
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 10',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2713,"end":2724}]'
                    },/*Figure 10c
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
                    'figure': 'Figure 10',
                    'lines': '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":77}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":678,"end":704}, {"start":710,"end":784}, {"start":790,"end":799}, {"start":805,"end":812}, {"start":835,"end":1356}, {"start":1362,"end":1388}, {"start":1393,"end":1460}, {"start":1466,"end":1473}, {"start":1499,"end":1513}, {"start":1520,"end":1542}, {"start":1548,"end":1556}, {"start":1565,"end":2168}, {"start":2174,"end":2200}, {"start":2205,"end":2271}, {"start":2278,"end":2285}, {"start":2310,"end":2321}, {"start":2351,"end":2377}, {"start":2385,"end":2405}, {"start":2413,"end":2437}, {"start":2447,"end":2450}, {"start":2499,"end":2531}, {"start":2566,"end":2590}, {"start":2595,"end":2601}, {"start":2608,"end":2609}, {"start":2617,"end":2622}, {"start":2645,"end":2649}, {"start":2725,"end":2736}]'
                    },*/
                    {
                    'title': 'A space–time statistical climate model for hurricane intensification in the North Atlantic basin',
'                    figure': 'Figure 11',
                    'lines': '[{"start":24,"end":29}, {"start":46,"end":51}, {"start":60,"end":67}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":151,"end":672}, {"start":2450,"end":2450}, {"start":2499,"end":2547}]'
                    },
                    {
                    'title': 'Assembly processes of gastropod community change with horizontal and vertical zonation in ancient Lake Ohrid: a metacommunity speciation perspective',
                    'figure': 'Figure 3',
                    'lines': '[{"start":40,"end":46}, {"start":57,"end":57}, {"start":78,"end":80}, {"start":1056,"end":1080}, {"start":1148,"end":1150}, {"start":1086,"end":1086}, {"start":1160,"end":1160}, {"start":1162,"end":1163}, {"start":1186,"end":1223}]'
                    },
                    {
                    'title': 'Automatic landslide length and width estimation based on the geometric processing of the bounding box and the geomorphometric analysis of DEMs',
                    'figure': 'Figure 9',
                    'lines': '[{"start":58,"end":73}, {"start":94,"end":278}, {"start":347,"end":348}, {"start":350,"end":352}, {"start":361,"end":361}, {"start":363,"end":364}, {"start":367,"end":367}]'
                    },
                    {
                    'title': 'Automatic landslide length and width estimation based on the geometric processing of the bounding box and the geomorphometric analysis of DEMs',
                    'figure': 'Figure 10',
                    'lines': '[{"start":58,"end":73}, {"start":94,"end":352}, {"start":370,"end":370}, {"start":372,"end":372}, {"start":379,"end":381}]'
                    },
                    {
                    'title': 'Development of a new gas-flaring emission dataset for southern West Africa',
                    'figure': 'Figure 2',
                    'lines': '[{"start":23,"end":45}, {"start":52,"end":89}, {"start":94,"end":109}]'
                    },
                    {
                    'title': "Have precipitation extremes and annual totals been increasing in the world's dry regions over the last 60 years?",
                    'figure': 'Figure 1',
                    'lines': '[{"start":39,"end":39}, {"start":49,"end":72}]'
                    },
                    {
                    'title': "Have precipitation extremes and annual totals been increasing in the world's dry regions over the last 60 years?",
                    'figure': 'Figure 2',
                    'lines': '[{"start":39,"end":45}, {"start":79,"end":111}]'
                    },
                    {
                    'title': 'INSYDE: a synthetic, probabilistic flood damage model based on explicit cost analysis',
                    'figure': 'Figure 2',
                    'lines': '[{"start":28,"end":28}, {"start":36,"end":336}, {"start":341,"end":367}, {"start":371,"end":422}]'
                    },
                    {
                    'title': 'Technical note: A bootstrapped LOESS regression approach for comparing soil depth profiles',
                    'figure': 'Figure 2',
                    'lines': '[{"start":31,"end":31}, {"start":42,"end":85}]'
                    },
                    {
                    'title': 'Technical note: A bootstrapped LOESS regression approach for comparing soil depth profiles',
                    'figure': 'Figure 3',
                    'lines': '[{"start":31,"end":31}, {"start":99,"end":146}]'
                    },
                    {
                    'title': 'Technical note: Estimating unbiased transfer-function performances in spatially structured environments',
                    'figure': 'Figure 4',
                    'lines': '[{"start":20,"end":26}, {"start":37,"end":80}]'
                    },
                    {
                    'title': 'Technical note: Fourier approach for estimating the thermal attributes of streams',
                    'figure': 'Figure 2',
                    'lines': '[{"start":48,"end":59}, {"start":75,"end":77}, {"start":81,"end":111}]'
                    },
                    {
                    'title': 'Interactions among temperature moisture and oxygen conventrations',
                    'figure': 'Figure 1',
                    'lines': '[{"start":32,"end":33}, {"start":39,"end":40}, {"start":55,"end":55}, {"start":101,"end":121}]'
                    },
                    {
                    'title': 'Interactions among temperature moisture and oxygen conventrations',
                    'figure': 'Figure 3',
                    'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":386,"end":408}, {"start":417,"end":417}]'
                    },
                    {
                    'title': 'Interactions among temperature moisture and oxygen conventrations',
                    'figure': 'Figure 4',
                    'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":149,"end":151}, {"start":386,"end":408}, {"start":420,"end":434}, {"start":467,"end":491}]'
                    },
                    {
                    'title': 'Interactions among temperature moisture and oxygen conventrations',
                    'figure': 'Figure 5',
                    'lines': '[{"start":32,"end":33}, {"start":40,"end":40}, {"start":55,"end":55}, {"start":149,"end":151}, {"start":237,"end":237}, {"start":386,"end":408}, {"start":420,"end":434}, {"start":497,"end":512}]'
                    }
                ];

                for(let i=0; i<papers.length;i++){
                    if(papers[i].title==title && papers[i].figure==figure){
                        return JSON.parse(papers[i].lines);
                    }
                }  
            
            
                            // A_space_time statistical_climate_model_for_hurricane_intensification: Figure 2b
                    //let lines = '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":63}, {"start":81,"end":82}, {"start":98,"end":112}, {"start":118,"end":119}, {"start":2618,"end":2618}, {"start":2447,"end":2448}, {"start":2620,"end":2622}, {"start":2645,"end":2666}]';

                // A_space_time statistical_climate_model_for_hurricane_intensification: Figure 3b
                    //let lines = '[{"start":24,"end":29}, {"start":35,"end":41}, {"start":46,"end":55}, {"start":60,"end":67}, {"start":82,"end":82}, {"start":86,"end":87}, {"start":98,"end":112}, {"start":2447,"end":2447}, {"start":2477,"end":2492}]';

                // Assembly_processes_of_gastropod_community_change: Figure 4 
                    //let lines = '[{"start":40,"end":46}, {"start":57,"end":57}, {"start":78,"end":80}, {"start":1270,"end":1272}, {"start":1282,"end":1302}]';

                            // Automatic_landslide_length_and_width_estimation_based_on_the_geometric_processing, Figure 9b
                    //let lines = '[{"start":58,"end":73}, {"start":94,"end":278}, {"start":350,"end":352}, {"start":360,"end":360}, {"start":362,"end":362}, {"start":364,"end":365}]';
                            // Automatic_landslide_length_and_width_estimation_based_on_the_geometric_processing, Figure 10b
                    //let lines = '[{"start":58,"end":73}, {"start":94,"end":352}, {"start":371,"end":372}, {"start":375,"end":376}, {"start":379,"end":379}, {"start":383,"end":384}]';

                // Automatic_landslide_length_and_width_estimation_based_on_the_geometric_processing, Figure 10b
                    //let lines = '[{"start":46,"end":47}, {"start":53,"end":53}, {"start":56,"end":60}, {"start":63,"end":74}, {"start":77,"end":85}, {"start":89,"end":117}]';

            
            
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