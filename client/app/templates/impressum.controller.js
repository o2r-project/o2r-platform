(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ImpressumController', ImpressumController);

    ImpressumController.$inject = ['header'];

    function ImpressumController(header){
        activate();

        //////////

        function activate(){
            header.setTitle('o2r - Impressum');
        }
    }
})();