// source: https://gist.github.com/thomseddon/3511330
(function(){
    'use strict';

    angular
        .module('starter')
        .filter('filesize', filesize);
    
    function filesize(){
        return size;

        function size(bytes, precision){
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        }
    }
})();