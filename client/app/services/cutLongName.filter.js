(function(){
    'use strict';

    angular
        .module('starter')
        .filter('cutLongName', cutLongName);
    
    cutLongName.$inject = ['$log'];
    function cutLongName($log){
        var maxnumber = 40;
        return cutName;

        function cutName(input){
            $log.debug(input);
            try {
                if(input.length >= maxnumber){
                    var short = input.substr(0, maxnumber) + '...';
                    return short;
                } else return;
            } catch (error) {
                $log.debug('cutLongName: input is null');
                return;
            }
        }
    }
})()