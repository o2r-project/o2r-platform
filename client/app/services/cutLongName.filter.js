(function(){
    'use strict';

    angular
        .module('starter')
        .filter('cutLongName', cutLongName);
    
    cutLongName.$inject = ['$log'];
    function cutLongName($log){
        return cutName;

        function cutName(input, chars){
            var maxnumber = chars || 40;
            //$log.debug(input);
            try {
                if(input.length >= maxnumber){
                    var short = input.substr(0, maxnumber) + '...';
                    return short;
                } else return input;
            } catch (error) {
                $log.debug('cutLongName: input is null');
                return;
            }
        }
    }
})()