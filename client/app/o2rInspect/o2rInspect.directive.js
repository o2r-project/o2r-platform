/**
 * Directive for displaying Code and Data
 * Expects one parameter: o2rInspectData of type object
 * Parameter is expected to have three attributes: code(array), data(array), publication(object)
 * Where code has following structure:
 * [{type: 'foo', path: 'bar', name: 'foobar'}, ...]
 * 
 * Where data has following structure:
 * ['path/to/first/file', 'path/to/second/file', ...]
 * 
 * Where publication contains the whole metadata object
 * 
 * Example: 
 * <o2r-inspect o2r-inspect-code="{{ {code: [], data: [], publication: {}} }}"></o2r-inspect>
 */


(function(){
    'use strict';

    angular
        .module('starter.o2rInspect')
        .directive('o2rInspect', o2rInspect);
    
    o2rInspect.$inject = ['$log', 'publications', 'icons', 'env'];
    function o2rInspect($log, publications, icons, env){
        return {
            restrict: 'E',
            templateUrl: 'app/o2rInspect/o2rInspect.template.html',
            scope: {
                o2rInspectData: '@o2rInspectData'
            },
            link: link
        };

        function link(scope, iElement, attrs){
            scope.$watch('o2rInspectData', function(newVal, oldVal){
                var inspect = angular.fromJson(newVal);
                if(!inspect.hasOwnProperty('code')) throw 'o2rInspectData.code undefined';
                if(!inspect.hasOwnProperty('data')) throw 'o2rInspectData.data undefined';
                if(!inspect.hasOwnProperty('publication')) throw 'o2rInspectData.publication undefined';
               
                scope.icons = icons;
                if(inspect.data[0]!=null){
                    scope.datasets = prepareDatasets(inspect.data);
                    scope.selectedData = scope.datasets[0];
                }
                
                if(inspect.code[0]!=null){
                    scope.code = prepareCode(inspect.code);
                    scope.selectedCode = publications.getContentById(inspect.publication, '/api/v1/compendium/' + inspect.publication.id + 
                                                                            '/data/' + inspect.publication.metadata.o2r.mainfile);
                }
                scope.openMenu = openMenu;

                scope.selectData = selectData;
                scope.selectCode = selectCode;

                ///////////

                /**
                 * 
                 * @param {Array} dsets , array containing all input files
                 */

                function prepareDatasets(dsets){
                    var results = [];
                    for(var i in dsets){
                        var tmp = dsets[i].split('/');
                        results.push(publications.getContentById(inspect.publication, env.c_api + '/compendium/' + inspect.publication.id + '/data/' + tmp));
                    }
                    return results;
                }

                function prepareCode(code){
                    var results = [];
                    for(var i in code){
                        results.push(publications.getContentById(inspect.publication, env.c_api + '/compendium/' + inspect.publication.id + '/data/' + code[i]));
                    }
                    return results;
                }

                function openMenu($mdMenu, ev){
                    $mdMenu.open(ev);
                }

                function selectData(item){
                    $log.debug('selected %o', item);
                    scope.selectedData = item;
                }

                function selectCode(item){
                    $log.debug('selected %o', item);
                    scope.selectedCode = item;
                }
            }, true);

        }
    }
})();