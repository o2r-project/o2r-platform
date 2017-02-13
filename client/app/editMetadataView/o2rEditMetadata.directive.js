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
    
    o2rEditMetadata.$inject = ['$log', '$filter', '$window', 'jobs', 'icons', 'httpRequests'];
    function o2rEditMetadata($log, $filter, $window, jobs, icons, httpRequests){
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
                publication: false,
                tech: false,
                depends: false
            };
            scope.icons = icons;
            scope.addItem = addItem;
            scope.edit = edit;
            scope.saveChanges = saveChanges;
            scope.showInput = showInput;
            scope.isEmpty = isEmpty;
            scope.isUndefined = (o) => angular.isUndefined(o); 
			attrs.$observe('o2rComp', function(value){
                if(value == ''){

                }else{
                    scope.editMode = false;
                    scope.cancelEditing = cancelEditing;
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
                                o2r: {}
                            };
                        }
                        scope.meta = scope.comp.metadata.o2r;
                    }
                    // create properties with arrays
                    if(!scope.meta.hasOwnProperty('keywords')) scope.meta.keywords = [{}];
                    if(!scope.meta.hasOwnProperty('depends')) scope.meta.depends = [{operatingSystem: [{}] }];
                    /* use this, when author metadata is an object
                    if(!scope.meta.hasOwnProperty('author')) scope.meta.author = [{ authorAffiliation: [{}], authorId:[{}] }];
                    for(var i in scope.meta.depends){
                        if(!scope.meta.depends[i].hasOwnProperty('operatingSystem')) scope.meta.depends[i].operatingSystem = [{}];
                    }
                    for(var i in scope.meta.author){
                        if(!scope.meta.author[i].hasOwnProperty('authorAffiliation')) scope.meta.author[i].authorAffiliation = [{}];
                        if(!scope.meta.author[i].hasOwnProperty('authorId')) scope.meta.author[i].authorId = [{}];
                    }
                    */
                    //if(scope.meta.hasOwnProperty('dateCreated')) scope.date = new Date(scope.meta.dateCreated);
                    if(angular.isDefined(scope.meta.dateCreated)){
                        $log.debug('used existing dateCreated');
                        scope.date = new Date(scope.meta.dateCreated);
                    } else {
                        $log.debug('created new dateCreated');
                        scope.date = new Date();
                    }
                    scope.changedDate = changedDate;
                    scope.original = angular.copy(scope.meta);
                    scope.checkChanges = () => !angular.equals(scope.original, scope.meta);
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

            /**
             * @Desc adds item to array including item id
             * @Param target, variable where item should be added
             * @Param type, datatype that should be added to array
             */
            function addItem(target, type){
                var item;
                switch (type) {
                    case 'author':
                        item = {
                            authorAffiliation: [{}],
                            authorId: [{}]
                        };
                        break;
                    case 'depends':
                        item = {
                            operatingSystem: [{}]
                        };
                        break;
                    default:
                        item = {};
                        break;
                }
                target.push(item);
                return;
            }

            function showInput(field){
                return showField[field];
            }

            function edit(field){
                showField[field] = true;
                scope.editMode = true;
            }

            function saveChanges(id, changes, original){
                // remove empty objects and upload
                httpRequests
                    .updateMetadata(original.ercIdentifier, removeArtifacts(changes))
                    .then(function(response){
                        $log.debug(response);
                        /*
                        scope.cancelEditing(); //reset edit mode
                        scope.meta = response;
                        scope.original = angular.copy(scope.meta);
                        */
                        $window.location.reload();
                    })
                    .catch(function(err){
                        $log.debug(err);
                    });
            }

            function cancelEditing(){
                // reset scope.meta
                scope.meta = angular.copy(scope.original);
                for(var i in showField){
                    showField[i] = false;
                }
                scope.editMode = false;
            }

            /**
             * @Desc checks if an object is empty, according to its empty template
             * @param obj, object to check if it is empty
             * @param attr, String referring to its empty template
             */
            function isEmpty(obj, attr){
                var emptyTmplt;
                switch(attr){
                    case 'depends':
                        emptyTmplt = { operatingSystem: [{}] };
                        break;
                    default:
                        emptyTmplt = {};
                        break;
                }
                return angular.equals(obj, emptyTmplt);
            }

            function removeArtifacts(obj){
                checkKeywords();
                checkDepends();
                $log.debug('removed artifacts from object');
                return obj;

                function checkKeywords(){
                    for(var i=obj.keywords.length; i>0; i--){
                        if(!obj.keywords[i-1].hasOwnProperty('name')) obj.keywords.splice(i-1, 1);
                    }
                    if(obj.keywords.length == 0) delete obj.keywords;
                }

                function checkDepends(){
                    for(var i=obj.depends.length; i>0; i--){
                        for(var j=obj.depends[i-1].operatingSystem.length; j>0; j--){
                            if(!obj.depends[i-1].operatingSystem[j-1].hasOwnProperty('name')) obj.depends[i-1].operatingSystem.splice(j-1, 1);
                        }
                        if(obj.depends[i-1].operatingSystem.length == 0) delete obj.depends[i-1].operatingSystem;
                        if(!obj.depends[i-1].hasOwnProperty('version') && !obj.depends[i-1].hasOwnProperty('packageId') && !obj.depends[i-1].hasOwnProperty('packageSystem')) obj.depends.splice(i-1, 1);
                    }
                    if(obj.depends.length == 0) delete obj.depends;
                }
            }

            function changedDate(val){
                $log.debug('changed date to %s', val);
                scope.meta.dateCreated = $filter('date')(val, 'dd-MM-yyyy');
            }

		}
    }
})();