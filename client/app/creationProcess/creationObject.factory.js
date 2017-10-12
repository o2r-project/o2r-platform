(function(){
    'use strict';

    angular
        .module('starter')
        .factory('creationObject', creationObject);
    
    creationObject.$inject = ['$log'];
    function creationObject($log){
        var logger = $log.getInstance('creationObject');

        var erc = {};
        var service = {
            get: get,
            set: set,
            destroy: destroy,
            getRequired: getRequired,
            getOptional: getOptional,
            getSpacetime: getSpacetime,
            getUibindings: getUibindings,
            simpleUpdate: simpleUpdate,
            updateTemporal: updateTemporal,
            updateLicense: updateLicense,
            updateAuthor: updateAuthor,
            addAuthor: addAuthor,
            removeAuthor: removeAuthor,
            updateTemporalBegin: updateTemporalBegin,
            updateTemporalEnd: updateTemporalEnd,
            updateSpatialFiles: updateSpatialFiles,
            removeArtifacts: removeArtifacts
        };

        return service;

        /////////

        function get(){
            return angular.copy(erc);
        }

        function set(obj){
            erc = obj;
            logger.info('Successfully set');
        }

        function destroy(){
            erc = {};
            logger.info('Successfully destroyed');
        }

        function getOptional(){
            var optional = {
                keywords: erc.metadata.o2r.keywords, //array
                paperLanguage: erc.metadata.o2r.paperLanguage, //array
                researchQuestions: erc.metadata.o2r.researchQuestions, //array
                researchHypotheses: erc.metadata.o2r.researchHypotheses //array
            };
            return angular.copy(optional);
        }

        function getRequired(){
            let viewfiles_fix = erc.metadata.o2r.viewfiles;
            viewfiles_fix.push(erc.metadata.o2r.paperSource);

            var required = {
                title: erc.metadata.o2r.title,
                description: erc.metadata.o2r.description,
                publicationDate: erc.metadata.o2r.publicationDate,
                softwarePaperCitation: erc.metadata.o2r.softwarePaperCitation,
                license: erc.metadata.o2r.license,
                author: erc.metadata.o2r.author,
                viewfiles: viewfiles_fix,
                viewfile: erc.metadata.o2r.viewfile
            };
            return angular.copy(required);
        }

        function getSpacetime(){
            var required = {
                temporal: erc.metadata.o2r.temporal,
                spatial: erc.metadata.o2r.spatial
            };
            return angular.copy(required);
        }

        function getUibindings(){
            return angular.copy(erc.metadata.o2r.interaction);
        }
        
        function updateAuthor(index, name, aff, orcid){
            //if(angular.isUndefined(erc.metadata.o2r.author[index])) erc.metadata.o2r.author[index] = {affiliation: ""};
            if(name) erc.metadata.o2r.author[index].name = name;
            if(aff) erc.metadata.o2r.author[index].affiliation = aff;
            if(orcid) erc.metadata.o2r.author[index].orcid = orcid;
        }

        function addAuthor(auth){
            erc.metadata.o2r.author.push(auth);
        }

        function removeAuthor(index){
            erc.metadata.o2r.author.splice(index, 1);
        }

        //allowed values for lic: 'text', 'code', 'data', 'uibindings'
        function updateLicense(lic, val){
            // if(index || index == 0) erc.metadata.o2r.license[index] = lic;
            // else erc.metadata.o2r.license = lic;
            logger.info('updating license.', lic);
            erc.metadata.o2r.license[lic] = val;
        }

        function simpleUpdate(attr, val){
            erc.metadata.o2r[attr] = val;
            logger.info('updated ', attr);
        }

        function updateTemporal(attr, val){
            erc.metadata.o2r.temporal[attr] = val;
            logger.info('updated temporal.', attr);
        }

        function updateTemporalBegin(dat){
            erc.metadata.o2r.temporal.begin = dat;
        }

        function updateTemporalEnd(dat){
            erc.metadata.o2r.temporal.end = dat;
        }

        function updateSpatialFiles(spat){
            logger.info('updateSpatialFiles', spat);
            erc.metadata.o2r.spatial.files = spat;
        }

        function removeArtifacts(attr){
            var obj = erc.metadata.o2r[attr];
            for(var i=obj.length-1; i>=0; i--){
                //if array at index contains empty string or is undefined, delete index
                if(angular.isUndefined(obj[i]) || (obj[i].length == 0)){
                    obj.splice(i, 1);
                }
            }
        }
    }
})();