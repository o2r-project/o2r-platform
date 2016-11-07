(function(){
    'use strict';

    angular
        .module('starter')
        .factory('header', header);

    function header(){
        var title='o2r - opening reproducible research';
        var headerFct = {
            title: function (){return title;},
            setTitle : function(newTitle){title = newTitle;}
        };

        return headerFct;
    }
})();