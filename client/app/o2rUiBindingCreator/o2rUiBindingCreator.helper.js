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
            removeOverlap: removeOverlap,
            mergeSelectedCode: mergeSelectedCode
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
            return overlaps;
        }

        function mergeSelectedCode(selectionLines, text){
            var result = '';
            var lines = [];
            // push each single line of selection into lines[]
            for(var i in selectionLines){
                if(selectionLines[i].start == selectionLines[i].end) lines.push(selectionLines[i].start-1);
                else{
                    for(var j=selectionLines[i].start; j<=selectionLines[i].end; j++){
                        lines.push(j-1);
                    }
                }
            }
            // split text into its lines
            var textLines = text.split('\n');
            //iterate over all selected lines and add corresponding textline to result
            for(var i in lines){
                result += textLines[lines[i]] + '\n';
            }
            return result;
        }
    }
})();