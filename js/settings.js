'use strict';

app.controller("settings", function ($scope, $rootScope) {
	$rootScope.price = 0.1;

	$scope.updateSettings = function(price) {
		$rootScope.price = price;
	};

});