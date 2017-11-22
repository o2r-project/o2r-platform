(function(){
    'use strict';
    angular
        .module('starter.o2rRecipient')
        .factory('o2rRecipientHelper', o2rRecipientHelper);
    
    o2rRecipientHelper.$inject = ['$log', 'httpRequests'];
    function o2rRecipientHelper($log, httpRequests){
        var logger = $log.getInstance('o2rRecipientHelper');
        var service = {
            setSpinner: setSpinner,
            setButtonTypes: setButtonTypes,
            shipTo: shipTo,
            publish: publish
        };
        return service;

        //////////////

        /**
         * Sets up an object with an attribute for each recipient and a boolean value if a spinner should be shown
         * @param {Array} recips, array of all recipients added to the scope  
         * @param {Object} target, target object where displaying spinner will be handled
         */
        function setSpinner(recips, target){
            for(var i in recips){
                target[recips[i].id] = false;
            }
        }

        /**
         * Sets up an object with attributes for displaying a specific icon fitting to recipient type
         * @param {*} recips 
         * @param {*} target 
         */
        function setButtonTypes(recips, target){
            for(var i in recips){
                target[recips[i].id] = {};
                target[recips[i].id].type = null;
                target[recips[i].id].show = false;
            }
        }

        function shipTo(recip, ercId, spinner, buttonTypes, shipmentIds){
            logger.info('shipping to ', angular.toJson(recip));
            spinner[recip] = true;
            httpRequests.newShipment(ercId, recip)
                .then(function(response){
                    logger.info(response);
                    return httpRequests.getShipment(response.data.id);
                })
                .then(function(response){
                    logger.info(response.data);
                    if(response.data.hasOwnProperty('dl_filepath')){ // handle it as download
                        buttonTypes[recip].type = "download";
                    } else { //handle it as publish
                        buttonTypes[recip].type = "publish";
                    }
                    shipmentIds[recip] = response.data.id;
                    spinner[recip] = false;
                    buttonTypes[recip].show = true;
                })
                .catch(function(err){
                    spinner[recip] = false;
                    logger.info(err);
                });
        }

        function publish(shipment_id){
            logger.info('publishing with id ', shipment_id);
            httpRequests.publishERC(shipment_id)
                .then(function(response){
                    logger.info('published', response);
                })
                .catch(function(err){
                    logger.info(err);
                });
        }
    }
})();