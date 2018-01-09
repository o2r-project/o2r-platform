/**
 * Directive for handling shipments (including download)
 * 
 * <o2r-recipient o2r-recipient-object=""></o2r-recipient>
 * 
 * o2r-recipient-object expects an object of following structure
 * {
 *  erdId: String //id of an erc
 *  shipmentInfo: Array //array of status objects of already existing shipments
 *  recipient: Object // contains response from /recipient
 * }
 * 
 * Example:
 * Assuming vm.recip is an object according to before mentioned structure.
 * 
 * <o2r-recpipient o2r-recipient-object="vm.recip"></o2r-recipient-object>
 * 
 */

(function(){
    'use strict';

    angular
        .module('starter.o2rRecipient')
        .directive('o2rRecipient', o2rRecipient);
    
    o2rRecipient.$inject = ['$log', '$mdDialog', 'httpRequests', 'icons', 'o2rRecipientHelper', 'env'];
    function o2rRecipient($log, $mdDialog, httpRequests, icons, o2rRecipientHelper, env){
        var logger = $log.getInstance('o2rRecipient');
        return {
            restrict: 'E',
            scope: {
                recipient: '=o2rRecipientObject'
            },
            templateUrl: 'app/o2rRecipient/o2rRecipient.template.html',
            link: link
        };

        function link(scope){
            scope.env = env;
            scope.icons = icons;
            scope.openMenu = openMenu;
            scope.shipTo = o2rRecipientHelper.shipTo;
            scope.spinner = {};
            scope.buttonTypes = {};
            scope.getIcon = getIcon;
            scope.publish = o2rRecipientHelper.publish;
            scope.shipmentIds = {};
            // scope.shipments = o2rRecipientHelper.updateShipmentStatus(scope.recipient.shipmentInfo, scope.recipient.recipient);
            activate();

            scope.$watch('shipmentIds', function(newVal, oldVal){
                logger.info('new ' + angular.toJson(newVal)+ 'old ' + angular.toJson(oldVal));
            });

            ////////////

            function activate(){
                scope.rec = o2rRecipientHelper.prepareRec(scope.recipient);
                logger.info('rec', scope.rec);
                logger.info('o2r-recipient-object', scope.recipient);
                o2rRecipientHelper.setSpinner(scope.recipient.recipient, scope.spinner);
                o2rRecipientHelper.setButtonTypes(scope.recipient.recipient, scope.buttonTypes);
                // o2rRecipientHelper.setPublish(scope.recipients, scope.publish);
            }

            function getIcon(type){
                var result;
                if (type == "download"){
                    result = scope.icons.download;
                } else if(type == "publish"){
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