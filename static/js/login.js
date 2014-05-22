'use strict';

var login = angular.module('login', []);

login.controller("loginCtrl", function ($scope, $http, $window) {

	$scope.login_ = function(username, password) {

			var post_args = {
				username: username,
				password: password
			};

			$http({
			    method: 'POST',
			    url: BASE_URL+"parfois/validate",
			    data: post_args,
			    headers: {'Content-Type': 'application/json'}
			}).success(function(data) {
				if (data.validationStatus == "Valid password"){
					$window.location.href = 'http://85.139.244.19/parfois/static/index.html';
				}
				else {
					alert(data.validationStatus);
				}
			});

	}

});