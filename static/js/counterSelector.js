'use strict';

app.controller("counterSelector", function ($scope, $rootScope) {

	$rootScope.counter = 1;
	$scope.setCounter = function(cnt) {
		$rootScope.counter = cnt;

		if (cnt == 1){
			var feedId_instant_energy = "7";
		}
		else if (cnt == 2){
			var feedId_instant_energy = "5";	
		}
	};

});