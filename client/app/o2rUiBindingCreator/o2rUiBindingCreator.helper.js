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
            removeCarriage: removeCarriage,
            getSelectionLines: getSelectionLines,
            removeOverlap: removeOverlap,
            mergeSelectedCode: mergeSelectedCode,
            setUpLineHighlight: setUpLineHighlight,
            validateVariable: validateVariable
        };
        return service;

        ////////

        /**
         * 
         * @param {String} selection, string of selected text 
         * @param {String} text, string from which selection was made 
         */
        function getSelectionLines(selection, text){
            var selectionLines = selection.split("\n");
            var inverseSelection = text.split(selection);
            var pre = inverseSelection[0].split("\n");
            var selectionEndLine = pre.length + selectionLines.length -1;
            
            if(selectionLines[selectionLines.length -1] == ""){
                selectionEndLine -= 1;
                logger.info('empty string at end');
            }
            var result = {
                start: pre.length,
                end: selectionEndLine
            };
            return result;
        }
        
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
                        
        /**
         * Merges all selections into a single string and returns this string
         * @param {Array} selectionLines, array of objects containing start and endpoint of a single selection 
         * @param {String} text, original text from where selection was made
         */
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
                        
        /**
         * Removes carriage of a text
         * @param {String} text, text from which carriage needs to be removed 
         */
        function removeCarriage(text){
            var noR = text.split("\r");
            var newtext = "";
            for(var i in noR){
                newtext += noR[i];
            }
            logger.info('removed carriage');
            return newtext;
        }

        /**
         * Creates a string of line numbers and ranges according to prism specification
         * @param {Array} lines, array of objects containing start and endnumber of selection 
         */
        function setUpLineHighlight(lines){
            var result = "";
            for(var i in lines){
                if(i == 0){
                    if(lines[i].end === lines[i].start) result += lines[i].start;
                    else result += lines[i].start + "-" + lines[i].end;
                } else {
                    if(lines[i].end === lines[i].start) result += "," + lines[i].start;
                    else result += "," + lines[i].start + "-" + lines[i].end;
                }
            }
            logger.info(result);
            return result;
        }

        function validateVariable(selection){
            var parts = selection.split(' ').join().replace(/,/g, '');
            var reg = /^\w+(=|<-)\d+$/;
            var match = parts.match(reg);
            var isNumeric = false;
            if(match == null) return null;
            else {
                var tmp = selection.split('=');
                var tmp2 = selection.split('<-');
                var variable = {};
                if(tmp.length > 1) {
                    variable.val = parseFloat(tmp[1]);
                    variable.varName = tmp[0];
                }
                else {
                    variable.val = parseFloat(tmp2[1]);
                    variable.varName = tmp2[0];
                }
                if(isNaN(variable.val)) {
                    variable = null;
                }
                return variable;
            }
        }


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
    }
})();