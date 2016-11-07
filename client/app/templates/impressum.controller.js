(function(){
    'use strict';

    angular
        .module('starter')
        .controller('ImpressumCtrl', ImpressumCtrl);

    ImpressumCtrl.$inject = ['header'];

    function ImpressumCtrl(header){
        activate();

        //////////

        function activate(){
            header.setTitle('o2r - Impressum');
        }
    }
})();