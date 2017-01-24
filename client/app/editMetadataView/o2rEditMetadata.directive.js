/**
 * Directive for displaying metadata of a single compendium.
 * Directive can only be used as an Html-Element and expects an attribute o2r-comp.
 * o2r-comp must be an object with at least the following attributes:
 * 
 * {
 * id: String, //id has to contain the id of the compendium
 * }
 * 
 * Example:
 * <o2r-edit-metadata o2r-comp="{id: 'foo'}"></o2r-edit-metadata>
 * 
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .directive('o2rEditMetadata', o2rEditMetadata);
    
    o2rEditMetadata.$inject = ['$log', 'jobs', 'icons', 'httpRequests'];
    function o2rEditMetadata($log, jobs, icons, httpRequests){
        return {
            restrict: 'E',
            scope: {
                o2rComp: '@'
            },
            templateUrl: 'app/editMetadataView/o2rEditMetadata.template.html',
            link: link
        };

        function link(scope, iElement, attrs){
            var showField = {
                author: false,
                publication: false
            };
            const noChange = {
                author: [],
                keywords: []
            };
            scope.icons = icons;
            scope.isSpecial = isSpecial;
            scope.authorList = [{id: 'author1'}];
            scope.keywordList = [{id: 'keyword1'}];
            scope.addItem = addItem;
            scope.edit = edit;
            scope.changes = {
                author: [],
                keywords: []
            };
            scope.saveChanges = saveChanges;
            scope.checkChanges = () => !angular.equals(noChange, scope.changes); 
            scope.editMode = false;
            scope.showInput = showInput;
            scope.isUndefined = (o) => angular.isUndefined(o); 
			attrs.$observe('o2rComp', function(value){
                if(value == ''){

                }else{
                    scope.comp = angular.fromJson(value);
                    // reset showField values to default
                    showField.author = false;
                    showField.publication = false;
                    try {
                        scope.meta = scope.comp.metadata.o2r;
                    } catch (error) {
                        $log.debug('comp.metadata or comp.metadata.o2r is undefined. Creating missing objects...');   
                        if(angular.isDefined(scope.comp.metadata)){
                            scope.comp.metadata.o2r = {};
                        } else {
                            scope.comp.metadata = {
                                o2r:{
                                    author: [],
                                    depends: [],
                                    keywords: []
                                }
                            };
                        }
                        scope.meta = scope.comp.metadata.o2r;
                    }
                    $log.debug('selected comp: %s', scope.comp.id);
                    activate();
                }
			});
            
        
            /////////////////
            function activate(){
                setCompStatus(scope.comp.id);
                $log.debug(scope.comp);
            }

            function setCompStatus (id){
                jobs.callJobs({compendium_id : id})
                    .then(function(res){
                        scope.comp.status = res.data;
                        $log.debug('EditMetadataCtrl, comp.status: %o', scope.comp.status);
                    });
            }
            
            function isSpecial(key){
                var special;
                switch(key){
                    case 'files':
                        special = true;
                        break;
                    case 'status':
                        special = true;
                        break;
                    case 'texts':
                        special = true;
                        break;
                    case 'compendium_id':
                        special = true;
                        break;
                    case 'jobs':
                        special = true;
                        break;
                    case 'created':
                        special = true;
                        break;
                    case 'metadata':
                        special = true;
                        break;
                    case 'author':
                        special = true;
                        break;
                    case 'depends':
                        special = true;
                        break;
                    case 'keywords':
                        special = true;
                        break;
                    default:
                        special = false;
                }
                return special;
            }

            /**
             * @Desc adds item to array including item id
             * @Param target, variable where item should be added
             * @Param type, string to prepend id
             */
            function addItem(target, type){
                /*
                var newItemNo = target.length + 1;
                target.push({'id': type + newItemNo});
                return;
                */
                if(angular.equals(noChange, scope.changes)){
                    //nothing changed
                } else {
                    //update meta object and submit it
                }
            }

            function showInput(field){
                return showField[field];
            }

            function edit(field){
                showField[field] = true;
                scope.editMode = true;
            }

            /*
                TODO Update whole function
            */
            function saveChanges(id, changes, original){
                //update object to be uploaded
                //var data = merge(changes, original);
               // merge(changes, original);
                //TODO upload object
                for(var i in showField){
                    showField[i] = false;
                }
                scope.editMode = false;

                function merge(c, o){
                    //array check and update

                    //overwrite other attributes
                    for(var i in c){
                        if(!c.hasOwnProperty(i)) continue;
                        if(c[i] == 'author' || c[i] == 'keywords'){
                            $log.debug('is author or keywords');
                        } else {
                            o[i] = c[i];
                        }
                            
                    }
                    $log.debug('new object %o', o);
                }
            }

		}
    }
})();