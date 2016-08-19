"use strict";
app.factory('login', ['$rootScope', 'httpRequests', function($rootScope, httpRequests){
	var user = {};

	var setUser = function(u){
		user = u;
		$rootScope.$broadcast('setUser');
	};

	var getUser = function(){
		return user;
	}
	var getUserCall = function(){
		httpRequests.getLoggedUser(function(user){
			setUser(user);
			return user;
    	});
	};

	var isLoggedIn = function(){
		if(typeof getUser().name === 'undefined') return false;
		return true;
	};
	return {
		getUser: getUser,
		getUserCall: getUserCall,
		isLoggedIn: isLoggedIn
	};
}]);