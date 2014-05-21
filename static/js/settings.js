'use strict';

app.controller("settings", function ($scope, $rootScope, $http) {

	$scope.getSettings = function() {
		$http.get(BASE_URL+"/monitorizr/getData").success(function(data) {
			$scope.mail = data.mail;
			$scope.tmax = data.tmax;
			$scope.tmin = data.tmin;
			$rootScope.price = data.price;
		});
	};

	$scope.getSettings();

	$scope.updateSettings = function(mail, tmax, tmin, price) {
		$scope.mail = mail;
		$scope.tmax = tmax;
		$scope.tmin = tmin;
		$rootScope.price = price;

		var post_args = {
			mail: mail,
			tmax: tmax,
			tmin: tmin,
			price: price
		};

		$http({
		    method: 'POST',
		    url: BASE_URL+"/monitorizr/saveData",
		    data: post_args,
		    headers: {'Content-Type': 'application/json'}
		}).success(alert("Data saved"));
	};

});