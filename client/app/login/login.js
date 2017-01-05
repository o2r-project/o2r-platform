(function(){
	'use strict';

	angular
		.module('starter')
		.factory('login', login);
		
	login.$inject = ['$rootScope', '$log', '$analytics', 'httpRequests'];
	
	function login($rootScope, $log, $analytics, httpRequests){
		var user = {};
		var service = {
			getUser: getUser,
			getUserCall: getUserCall,
			isLoggedIn: isLoggedIn
		};

		return service;

		////////////

		function setUser(u){
			user = u;
			$rootScope.$broadcast('setUser');
			$analytics.setUsername(u.orcid);
		}

		function getUser(){
			return user;
		}

		function getUserCall(){
			httpRequests
				.getLoggedUser()
				.then(callback)
				.catch(errorHandler);
			
			function callback(user){
				$log.debug('getUserCall callback: %o', user);
				setUser(user.data);
				return;
			}
			function errorHandler(e){
				$log.debug('getUserCall errorHandler: %o', e);
			}
		}

		function isLoggedIn(){
			if(angular.isUndefined(getUser().name)) return false;
			return true;
		}
	}
})();