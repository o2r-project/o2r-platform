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
            scope.showInput = (field) => showField[field];
            scope.isEmpty = isEmpty;
            scope.isUndefined = (o) => angular.isUndefined(o);
            scope.notNull = (val) => val !== null;
            scope.myforms = {};
            scope.validate = validate; 
			attrs.$observe('o2rComp', function(value){
                if(value == ''){

                }else{
                    activate(value);
                }
			});
            
            /////////////////
            function activate(value){
                scope.cancelEditing = cancelEditing;
                scope.comp = angular.fromJson(value);
                resetShowField();
                try {
                    scope.original = scope.comp.metadata.o2r;
                } catch (error) {
                    $log.debug('comp.metadata or comp.metadata.o2r is undefined. Creating missing objects...');   
                    if(angular.isDefined(scope.comp.metadata)){ scope.comp.metadata.o2r = {}; } else { scope.comp.metadata = { o2r: {} }; }
                    scope.original = scope.comp.metadata.o2r;
                }
                // create properties with arrays
                if(scope.original.author.length == 0) scope.original.author.push({ affiliation: [{}] });
                for(var i in scope.original.author){
                    if(scope.original.author[i].affiliation.length == 0) scope.original.author[i].affiliation.push("");
                }
                if(scope.original.depends.length == 0) scope.original.depends.push({operatingSystem: [{}] });
                if(scope.original.keywords.length == 0) scope.original.keywords.push("");
                if(scope.original.paperLanguage == 0) scope.original.paperLanguage.push("");
                // create date object
                if(!scope.original.hasOwnProperty('dateCreated') || scope.original.dateCreated.length == 0){ scope.date = new Date();}
                else { scope.date = new Date(scope.original.dateCreated);}

                scope.changedDate = (val) => scope.original.dateCreated = $filter('date')(val, 'dd-MM-yyyy');
                scope.meta = angular.copy(scope.original);
                $log.debug(scope.meta);
                scope.checkChanges = () => !angular.equals(scope.meta, scope.original);
                $log.debug('selected comp: %s', scope.comp.id);
            }
            /**
             * @description adds item to array including item id
             * @param target, variable where item should be added
             * @param type, datatype that should be added to array
             */
            function addItem(target, type){
                var item;
                switch (type) {
                    case 'author':
                        item = {
                            affiliation: [""]
                        };
                        break;
                    case 'depends':
                        item = {
                            operatingSystem: [{}]
                        };
                        break;
                    default:
                        item = "";
                        break;
                }
                target.push(item);
                return;
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

            /*
            TODO: update this function according to new metadata structure
            */
            /**
             * @description checks if an object is empty, according to its empty template
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

            /*
            TODO: Update this function according to new metadata schema
            */

            /**
             * @description removes empty objects that had been added due to the creation of input fields
             * @param obj, metadata.o2r object, that will be uploaded to the server
             */
            function removeArtifacts(obj){
                checkStrings();
                checkKeywords();
                //checkDepends();
                checkAuthor();
                checkPaperLanguage();
                $log.debug('removed artifacts from object');
                return obj;

                function checkKeywords(){
                    for(var i=obj.keywords.length; i>0; i--){
                        if(obj.keywords[i-1].length == 0) obj.keywords.splice(i-1, 1);
                    }
                }

                //TODO update this function
                function checkDepends(){
                    for(var i=obj.depends.length; i>0; i--){
                        for(var j=obj.depends[i-1].operatingSystem.length; j>0; j--){
                            if(!obj.depends[i-1].operatingSystem[j-1].hasOwnProperty('name')) obj.depends[i-1].operatingSystem.splice(j-1, 1);
                        }
                        if(!obj.depends[i-1].hasOwnProperty('version') && !obj.depends[i-1].hasOwnProperty('packageId') && !obj.depends[i-1].hasOwnProperty('packageSystem')) obj.depends.splice(i-1, 1);
                    }
                }

                function checkAuthor(){
                    for(var i=obj.author.length; i>0; i--){
                        for(var j=obj.author[i-1].affiliation.length; j>0; j--){
                            if(obj.author[i-1].affiliation[j-1].length == 0) obj.author[i-1].affiliation.splice(j-1, 1);
                        }
                        if(obj.author[i-1].orcid === "") obj.author[i-1].orcid = null;
                        if(obj.author[i-1].name === "") obj.author[i-1].name = null;
                        if(angular.isUndefined(obj.author[i-1].orcid) 
                        && angular.isUndefined(obj.author[i-1].name) 
                        && (angular.isUndefined(obj.author[i-1].affiliation) || (obj.author[i-1].affiliation.length == 0))) obj.author.splice(i-1, 1);
                    }
                }

                function checkPaperLanguage(){
                    for(var i=obj.paperLanguage.length; i>0; i--){
                        if(obj.paperLanguage[i-1].length == 0) obj.paperLanguage.splice(i-1, 1);
                    }
                }

                // overwrites empty strings with null on first level of object
                function checkStrings(){
                    for(var i in obj){
                        if(obj[i] === "") obj[i] = null;
                    }
                    return;
                }
            }

            // reset showField values to default
            function resetShowField(){
                for(var i in showField){
                    showField[i] = false;
                }
                scope.editMode = false;
            }

            function validate(obj){
                $log.debug(obj);
                //if technical and publication form $valid is true return true
                //if publication form $valid is false, make copy and remove empty authors then check if valid
                if(obj.technicalform.$valid && obj.publicationform.$valid) return true;
                else {
                    // take meta.author and check for empty authors
                    var result = true;
                    var copy = angular.copy(scope.meta);
                    copy = removeArtifacts(copy);
                    for(var i in copy.author){
                        if(!copy.author[i].name) result = false;
                    }
                    return result;
                }
            }

		}
    }
})();