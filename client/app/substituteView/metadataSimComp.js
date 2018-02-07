(function(){
	'use strict';

	angular
		.module('starter')
		.factory('metadataSimComp', metadataSimComp);

	metadataSimComp.$inject = ['$http', '$rootScope','$q', '$log', 'httpRequests'];

	function metadataSimComp($http, $rootScope, $q, $log, httpRequests){
		var service = {
			callMetadata_simComp: callMetadata_similarCompendia
		};

		return service;

		///////////

    function sortByDate(array){
      array.sort(function(a,b){
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      });
    }

    // httpRequest for Metadata of all compendia of one author
    function callMetadata_similarCompendia(){
      var counter = 0;
      var deferred = $q.defer();
      var comp_meta = [];
      httpRequests
        .listCompendia()            // TODO #1 (substitution) similarity Analysis and only get choosen compendia
        .then(cb1)
        .catch(errorHandler);

      return deferred.promise;

      function cb1(response){
        for(var index in response.data.results){
          $log.debug('callMetadata_allCompendia, cb1 %o', response);
          httpRequests
            .singleCompendium(response.data.results[index])
            .then(cb2)
            .catch(errorHandler);
        }
        function cb2(res){
          comp_meta.push(res.data);
          counter ++;
          if(counter == response.data.results.length){
            sortByDate(comp_meta);
            $rootScope.$broadcast('loadedSimilarComps', comp_meta);
            deferred.resolve(comp_meta);
          }
        }

      }
      function errorHandler(e){
        $log.debug('callMetadata_allCompendia errorHandler: %o',e);
        deferred.resolve(e);
      }
    }

  }
})();
