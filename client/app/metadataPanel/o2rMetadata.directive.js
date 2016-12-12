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
 * <o2r-metadata o2r-comp="{id: 'foo'}"></o2r-metadata>
 * 
 */
(function(){
    'use strict';

    angular
        .module('starter')
        .directive('o2rMetadata', o2rMetadata);
    
    o2rMetadata.$inject = ['$log', 'jobs'];
    function o2rMetadata($log, jobs){
        return {
            restrict: 'E',
            scope: {
                o2rComp: '@'
            },
            templateUrl: 'app/metadataPanel/metadata_panel.html',
            link: link
        };

        function link(scope, iElement, attrs){
            scope.isSpecial = isSpecial;
            
			attrs.$observe('o2rComp', function(value){
                if(value == ''){

                }else{
                    scope.comp = JSON.parse(value);
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
                        $log.debug('MetadataCtrl, comp.status: %o', scope.comp.status);
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
                    default:
                        special = false;
                }
                return special;
            }
            
		}
    }
})();