'use strict';

var login = angular.module('login', []);

login.controller("loginCtrl", function ($scope, $http) {
	$scope.login_ = function(user, password) {
		$http({
		    //method: 'POST',
		    method: 'GET',
		    url: BASE_URL+"/monitorizr/login",
		    //data: post_args,
		    //headers: {'Content-Type': 'application/json'}
		})
		//.success(alert("Logged In"));
	};
});

