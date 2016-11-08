(function(){
    'use strict';

    angular
        .module('starter')
        .controller('PrivacyCtrl', PrivacyCtrl);

    PrivacyCtrl.$inject = ['header'];

    function PrivacyCtrl(header){
        activate();

        //////////

        function activate(){
            header.setTitle('o2r - Privacy');
        }
    }
})(this);