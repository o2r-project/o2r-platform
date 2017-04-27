(function(){
    'use strict';

    angular
        .module('starter')
        .controller('OptionalMetaController', OptionalMetaController);
    
    OptionalMetaController.$inject = ['$scope','$rootScope', '$stateParams', 'httpRequests', '$log'];

    function OptionalMetaController($scope, $rootScope, $stateParams, httpRequests, $log){
       
       processKeywords();       

       $scope.updateKeywords = function(){
           var keywords = $scope.keywords.split(';');
           $rootScope.meta.keywords = keywords;
       }

       $scope.updateResearchquestion = function(){
           $rootScope.meta.researchQuestion = $scope.changes.researchQuestion;
       }       

       $scope.updateHypotheses = function(){
           $rootScope.meta.hypotheses = $scope.changes.hypotheses;
       }

       function processKeywords(){
            $scope.keywords ="";
            for(var keyword in $rootScope.meta.keywords){
                $scope.keywords=$scope.keywords + "; " + $rootScope.meta.keywords[keyword]; 
            }
            $scope.keywords=$scope.keywords.substr(1,$scope.keywords.length);
       }
    
    }

})();