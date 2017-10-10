(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', 'header'];

    function HeaderController ($scope, header){
        var vm = this;
        vm.page = header;
    }
})(this);