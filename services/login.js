"use strict";
app.factory('login', ['$rootScope', '$analytics', 'httpRequests', function($rootScope, $analytics, httpRequests){
	var user = {};

	var setUser = function(u){
		user = u;
		$rootScope.$broadcast('setUser');
		$analytics.setUsername(u.orcid);
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