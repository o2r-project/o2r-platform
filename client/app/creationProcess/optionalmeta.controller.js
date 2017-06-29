(function(){
    'use strict';

    angular
        .module('starter')
        .controller('OptionalMetaController', OptionalMetaController);
    
    OptionalMetaController.$inject = ['$scope', '$log', 'creationObject', 'icons'];

    function OptionalMetaController($scope, $log, creationObject, icons){
        var logger = $log.getInstance('OptMeta');

        var vm = this;
        vm.icons = icons;
        vm.optional = creationObject.getOptional();

        vm.simpleUpdate = creationObject.simpleUpdate;
        /*
        vm.updateKeywords = creationObject.updateKeywords;
        vm.updatePaperLanguage = creationObject.updatePaperLanguage;
        vm.updateResearchHypotheses = creationObject.updateResearchHypotheses;

        vm.addItem = addItem;
        */
        
        $scope.$on('$destroy', function(){
            logger.info(angular.toJson(creationObject.getOptional()));
        });

        activate();

        /////////

        function activate(){
            //prepareKeywords();
            //prepareLanguage();
            //prepareHypotheses();
            //prepareQuestions();
        }

        /*
        function prepareKeywords(){
            //wenn komplett leer, füge "" hinzu, sonst mach nichts
            if(vm.optional.keywords.length == 0) vm.optional.keywords.push("");
        }

        function prepareLanguage(){
            if(vm.optional.paperLanguage.length == 0) vm.optional.paperLanguage.push("");
        }

        function prepareHypotheses(){
            if(vm.optional.researchHypotheses.length == 0) vm.optional.researchHypotheses.push("");
        }

        function prepareQuestions(){
            if(vm.optional.researchQuestions.length == 0) vm.optional.researchQuestions.push("");
        }

        function addItem(item){
            vm.optional[item].push("");
        }
        */
        /*
        function updateKeywords(){
            var keywords = vm.keywords.split(';');
            $rootScope.meta.keywords = keywords;
        }

        function updateResearchquestion(){
            $rootScope.meta.researchQuestion = vm.changes.researchQuestion;
        }       

        function updateHypotheses(){
            $rootScope.meta.hypotheses = vm.changes.hypotheses;
        }

        function processKeywords(){
            vm.keywords ="";
            for(var keyword in $rootScope.meta.keywords){
                vm.keywords=vm.keywords + "; " + $rootScope.meta.keywords[keyword]; 
            }
            vm.keywords=vm.keywords.substr(1,vm.keywords.length);
        }
        */

    }

})();