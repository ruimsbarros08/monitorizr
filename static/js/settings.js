'use strict';

app.controller("settings", function ($scope, $rootScope, $http) {

	$scope.getSettings = function() {
		$http.get(BASE_URL+"/parfois/getData").success(function(data) {
			if (data.message =="Data from user"){
				$scope.message = data.message;
				$scope.mail = data.data.mail;
				$scope.tmax = data.data.tmax;
				$scope.tmin = data.data.tmin;
				$rootScope.price = data.data.price;
			}
			else {
				$scope.message = data.message;
				alert($scope.message);
			}
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
		    url: BASE_URL+"/parfois/updateSettings",
		    data: post_args,
		    headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			alert(data.message);
		});
	};

});
