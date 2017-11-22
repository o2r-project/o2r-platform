(function(){
    'use strict';

    angular
        .module('starter.o2rRecipient')
        .directive('o2rRecipient', o2rRecipient);
    
    o2rRecipient.$inject = ['$log', '$mdDialog', 'httpRequests', 'icons', 'o2rRecipientHelper'];
    function o2rRecipient($log, $mdDialog, httpRequests, icons, o2rRecipientHelper){
        var logger = $log.getInstance('o2rRecipient');
        return {
            restrict: 'E',
            scope: {
                recipient: '@o2rRecipientObject',
                ercId: '@o2rErcId'
            },
            templateUrl: 'app/o2rRecipient/o2rRecipient.template.html',
            link: link
        };

        function link(scope){
            scope.recipients = angular.fromJson(scope.recipient);
            scope.icons = icons;
            scope.openMenu = openMenu;
            scope.shipTo = o2rRecipientHelper.shipTo;
            scope.spinner = {};
            scope.buttonTypes = {};
            scope.getIcon = getIcon;
            scope.publish = o2rRecipientHelper.publish;
            scope.shipmentIds = {};
            o2rRecipientHelper.setSpinner(scope.recipients, scope.spinner);
            o2rRecipientHelper.setButtonTypes(scope.recipients, scope.buttonTypes);
            // o2rRecipientHelper.setPublish(scope.recipients, scope.publish);

            scope.$watch('shipmentIds', function(newVal, oldVal){
                logger.info('new ' + angular.toJson(newVal)+ 'old ' + angular.toJson(oldVal));
            });

            function getIcon(recip){
                var result;
                if (scope.buttonTypes[recip].type == "download"){
                    result = scope.icons.download;
                } else if(scope.buttonTypes[recip].type == "publish"){
                    result = scope.icons.rowing;
                }
                return result;
            }

            function openMenu($mdMenu, ev){
                $mdMenu.open(ev);
            }
        }
    }
})();