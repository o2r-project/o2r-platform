(function(){
    'use strict';

    angular
        .module('starter')
        .factory('creationObject', creationObject);
    
    creationObject.$inject = ['$log', '$rootScope'];
    function creationObject($log, $rootScope){
        var erc = {};
        var service = {
            get: get,
            getRequired: getRequired,
            getOptional: getOptional,
            getSpacetime: getSpacetime,
            getUibindings: getUibindings,
            set: set,
            updateTitle: updateTitle,
            updateDescription: updateDescription,
            updatePublicationDate: updatePublicationDate,
            updateSoftwarePaperCitation: updateSoftwarePaperCitation,
            updateLicense: updateLicense,
            updateAuthorName: updateAuthorName,
            updateAuthorAffiliation: updateAuthorAffiliation,
            updateAuthorOrcid: updateAuthorOrcid,
            updateKeywords: updateKeywords,
            updatePaperLanguage: updatePaperLanguage,
            updateResearchQuestions: updateResearchQuestions,
            updateResearchHypotheses: updateResearchHypotheses,
            updateTemporalBegin: updateTemporalBegin,
            updateTemporalEnd: updateTemporalEnd,
            updateSpatialUnion: updateSpatialUnion,
            removeArtifacts: removeArtifacts,
            destroy: destroy
        };

        return service;

        /////////

        function get(){
            return angular.copy(erc);
        }

        function set(obj){
            erc = obj;
            $log.debug('Set creationobject successfully');
            $rootScope.$broadcast('set-creationObject');
        }

        function destroy(){
            erc = {};
            $log.debug('Destroyed creationObject successfully');
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
            var required = {
                title: erc.metadata.o2r.title,
                description: erc.metadata.o2r.description,
                publicationDate: erc.metadata.o2r.publicationDate,
                softwarePaperCitation: erc.metadata.o2r.softwarePaperCitation,
                license: erc.metadata.o2r.license,
                author: erc.metadata.o2r.author
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

        function updateAuthorName(name, index){
            erc.metadata.o2r.author[index].name = name;
        }

        function updateAuthorAffiliation(aff, index){
            erc.metadata.o2r.author[index].affiliation = aff;
        }

        function updateAuthorOrcid(orcid, index){
            erc.metadata.o2r.author[index].orcid = orcid;
        }

        function updateDescription(abs){
            erc.metadata.o2r.description = abs;
        }

        function updateTitle(title){
            erc.metadata.o2r.title = title;
        }

        function updateSoftwarePaperCitation(cit){
            erc.metadata.o2r.softwarePaperCitation = cit;
        }

        // TODO
        //check date format
        function updatePublicationDate(dat){
            erc.metadata.o2r.publicationDate = dat;
        }

        function updateLicense(lic){
            erc.metadata.o2r.license = lic;
        }

        function updateKeywords(key, index){
            erc.metadata.o2r.keywords[index] = key;
        }

        function updatePaperLanguage(lang, index){
            erc.metadata.o2r.paperLanguage[index] = lang;
        }

        function updateResearchQuestions(quest, index){
            erc.metadata.o2r.researchQuestions[index] = quest;
        }

        function updateResearchHypotheses(hypo, index){
            erc.metadata.o2r.researchHypotheses[index] = hypo;
        }

        function updateTemporalBegin(dat){
            erc.metadata.o2r.temporal.begin = dat;
        }

        function updateTemporalEnd(dat){
            erc.metadata.o2r.temporal.end = dat;
        }

        function updateSpatialUnion(spat){
            erc.metadata.o2r.spatial.union = spat;
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