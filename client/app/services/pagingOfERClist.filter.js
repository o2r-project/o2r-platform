(function(){
    'use strict';

    angular
        .module('starter')
        .filter('pagingOfERClist', pagingOfERClist);

    pagingOfERClist.$inject = ['$log'];
    function pagingOfERClist($log){
      return function(input, start) {
          start = +start;
          return input.slice(start);
      }
    }
})()
