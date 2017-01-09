(function(){
    'use strict';

    angular
        .module('starter')
        .controller('PrivacyController', PrivacyController);

    PrivacyController.$inject = ['header'];

    function PrivacyController(header){
        activate();

        //////////

        function activate(){
            header.setTitle('o2r - Privacy');
        }
    }
})();