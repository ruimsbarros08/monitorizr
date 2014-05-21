'use strict';

var login = angular.module('login', []);

login.controller("loginCtrl", function ($scope, $http, $window) {

	$scope.login_ = function(username, password) {

		//if (username == null && password == null){

			var post_args = {
				username: username,
				password: password
			};

			$http({
			    method: 'POST',
			    url: BASE_URL+"/validate",
			    data: post_args,
			    headers: {'Content-Type': 'application/json'}
			}).success(function(data) {
				if (data.validationStatus == "Valid password"){
					$window.location.href = 'http://openg.fe.up.pt/monitorizr/static/index.html';
				}
				else {
					alert(data.validationStatus);
				}
			});

		//}
		//else {
		//	alert("Please insert a valid username and password");
		//}

	}

});