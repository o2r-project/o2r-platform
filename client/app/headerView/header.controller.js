(function(){
    'use strict';

    angular
        .module('starter')
        .controller('HeaderCtrl', HeaderCtrl);

    HeaderCtrl.$inject = ['$scope', 'header'];

    function HeaderCtrl ($scope, header){
        var vm = this;
        vm.page = header;
    }
})(this);