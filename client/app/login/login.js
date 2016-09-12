(function(){
	'use strict';

	angular
		.module('starter')
		.factory('login', login);
		
	login.$inject = ['$rootScope', 'httpRequests'];
	
	function login($rootScope, httpRequests){
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
		}

		function getUser(){
			return user;
		}

		function getUserCall(){
			httpRequests.getLoggedUser(callback);
			
			function callback(user){
				setUser(user);
				return user;
			}
		}

		function isLoggedIn(){
			if(typeof getUser().name === 'undefined') return false;
			return true;
		}
	}
})();