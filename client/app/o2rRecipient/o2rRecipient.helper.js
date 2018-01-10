(function(){
    'use strict';
    angular
        .module('starter.o2rRecipient')
        .factory('o2rRecipientHelper', o2rRecipientHelper);
    
    o2rRecipientHelper.$inject = ['$log', 'httpRequests'];
    function o2rRecipientHelper($log, httpRequests){
        var logger = $log.getInstance('o2rRecipientHelper');
        var service = {
            prepareRec: prepareRec,
            setSpinner: setSpinner,
            setButtonTypes: setButtonTypes,
            shipTo: shipTo,
            publish: publish,
            updateShipmentStatus: updateShipmentStatus
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

        function shipTo(recip, ercId){
            logger.info('shipping to ', angular.toJson(recip));
            recip.spinner = true;
            if(recip.recipient == 'download'){
                httpRequests.newShipment(ercId, recip.recipient)
                    .then(function(response){
                        // credits for the following to 
                        // Scott (https://stackoverflow.com/users/1295344/scott) for https://stackoverflow.com/questions/24080018/download-file-from-an-asp-net-web-api-method-using-angularjs
                        // And
                        // Jaliya for http://jaliyaudagedara.blogspot.de/2016/05/angularjs-download-files-by-sending.html

                        var linkElement = document.createElement('a');
                        var blob = new Blob([response.data], {type: "application/zip"});
                        var objectUrl = URL.createObjectURL(blob);
                        linkElement.setAttribute('href', objectUrl);
                        linkElement.setAttribute('download', ercId);
                        var clickEvent = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: false
                        });
                        linkElement.dispatchEvent(clickEvent);
                        recip.spinner = false;
                    })
                    .catch(function(err){
                        logger.error(err);
                        recip.spinner = false;
                    });
            } else {
                httpRequests.newShipment(ercId, recip.recipient)
                .then(function(response){
                    logger.info(response);
                    // buttonTypes[recip].type = "publish";
                    // shipmentIds[recip] = response.data.id;
                    recip.id = response.data.id;
                    recip.spinner = false;
                    recip.showButton = true;
                })
                .catch(function(err){
                    recip.spinner = false;
                    logger.info(err);
                });
            }
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

        function updateShipmentStatus(shipInf, recip){
            var results = {};
            for(var i in recip){
                results[recip[i].id] = {};
                results[recip[i].id].status = null;
                results[recip[i].id].id = null;
            }
            for(var i in shipInf){
                results[shipInf[i].recipient].status = shipInf[i].status;
                results[shipInf[i].recipient].id = shipInf[i].id;
            }
            return results;
        }

        function prepareRec(recip){
            var result = [];
            for(var i in recip.recipient){
                var obj = {
                    recipient: recip.recipient[i].id, 
                    label: recip.recipient[i].label,
                    status: recip.recipient[i].status,
                    spinner: false,
                    showButton: false
                }
                if(recip.recipient[i].id == 'download') obj.buttonType = 'download';
                else obj.buttonType = 'publish';
                result.push(obj);
            }
            // add latest shipment id if exists
            for(var i in result){
                for(var j in recip.shipmentInfo){
                    if(result[i].recipient == recip.shipmentInfo[j].recipient){
                        result[i].status = recip.shipmentInfo[j].status;
                        result[i].id = recip.shipmentInfo[j].id;
                        if(result[i].status == 'shipped' && (result[i].recipient != 'download')) result[i].showButton = true;
                    }
                }
            }
            return result;
        }
    }
})();