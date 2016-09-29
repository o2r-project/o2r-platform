(function(){
	'use strict';

	angular
		.module('starter')
		.factory('login', login);
		
	login.$inject = ['$rootScope', '$analytics', 'httpRequests'];
	
	function login($rootScope, $analytics, httpRequests){
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
				console.log('getUserCall callback: %o', user);
				setUser(user.data);
				return;
			}
			function errorHandler(e){
				console.log('getUserCall errorHandler: %o', e);
			}
		}

		function isLoggedIn(){
			if(typeof getUser().name === 'undefined') return false;
			return true;
		}
	}
})();