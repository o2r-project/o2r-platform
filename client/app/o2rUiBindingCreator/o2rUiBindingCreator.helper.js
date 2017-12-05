(function(){
    'use strict';
    angular
        .module('starter.o2rUiBindingCreator')
        .factory('o2rUiBindingCreatorHelper', o2rUiBindingCreatorHelper);
    
    o2rUiBindingCreatorHelper.$inject = ['$log'];
    function o2rUiBindingCreatorHelper($log){
        var logger = $log.getInstance('o2rUiBindingCreatorHelper');
        var service = {
            // isDuplicate: isDuplicate,
            removeOverlap: removeOverlap
        };
        return service;

        ////////

        // /**
        //  * Remove duplicates within selection
        //  * @param {Array} selection, array of objects with attributes int'start' and int'end' 
        //  */
        // function isDuplicate(selection, selectionLines){
        //     var exists = false;
        //     for(var i in selectionLines){
        //         if(angular.equals(selection, selectionLines[i])) exists = true;
        //     }
        //     return exists;
        // }

        /**
         * Checks if the current selection overlaps/touches/contains etc. previous selection(s).
         * If it does, the previous selection(s) will be removed and the new selection will be added
         * If it does not touch a previous selection, both selections still exist.
         * 
         * @param {Object} selection, object of currently selected lines 
         * @param {Array} selectionLines, Array of previously selected objects 
         */
        function removeOverlap(selection, selectionLines){
            var overlaps = [];
            logger.info(overlaps.length);
            if(selectionLines.length == 0) overlaps.push(selection);
            else {
                for(var i in selectionLines){
                    if(
                        (selection.start < selectionLines[i].start 
                            && selection.start < selectionLines[i].end 
                            && selection.end >= selectionLines[i].start
                            && selection.end <= selectionLines[i].end)
                        ||
                        (selection.start >= selectionLines[i].start 
                            && selection.start <= selectionLines[i].end 
                            && selection.end >= selectionLines[i].start
                            && selection.end <= selectionLines[i].end)
                        ||
                        (selection.start >= selectionLines[i].start 
                            && selection.start <= selectionLines[i].end 
                            && selection.end > selectionLines[i].start
                            && selection.end > selectionLines[i].end)
                        ||
                        (selection.start < selectionLines[i].start 
                            && selection.start < selectionLines[i].end 
                            && selection.end > selectionLines[i].start
                            && selection.end > selectionLines[i].end)
                    ){
                    } else {
                        overlaps.push(selectionLines[i]);
                    }
                }
                overlaps.push(selection);
            } 
            logger.info(overlaps);
            return overlaps;
        }
    }
})();