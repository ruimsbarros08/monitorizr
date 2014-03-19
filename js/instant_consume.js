/*
app.factory("instant_cons", function($q, $http, $timeout) {

		var new_t = (new Date()).getTime();
		var old_t = new_t - 3600000*0.1
		
		var deferred = $q.defer();
		var url = "http://openg.fe.up.pt/emoncms/feed/data.json?&id=3&start="+old_t+"&end="+new_t+"&dp=500&apikey=dc1c0ce300c4859934ec0f868671b2e5";
		$http.get(url).success(function(data){
			deferred.resolve(data);
		});
		return deferred.promise;


});
*/

app.controller("main_info", function ($scope, $q, $http, $interval) {

    $scope.refreshInterval = 5; // For every 5 sec

  // Create a function as we will reuse this code
  function refresh() {
  
	var new_t = (new Date()).getTime();
	var old_t = new_t - 3600000*0.1
	
	var deferred = $q.defer();
	var url = "http://openg.fe.up.pt/emoncms/feed/data.json?&id=3&start="+old_t+"&end="+new_t+"&dp=500&apikey=dc1c0ce300c4859934ec0f868671b2e5";
	$http.get(url).success(function(data){
		deferred.resolve(data);
	});
	
	return deferred.promise;
	//console.log($scope.cons);
  
}

  $scope.cons = refresh(); // We call the function on initialization to load the feed.
  // $interval runs the given function every X millisec (2nd arg)
  $interval(function() { 
    //refresh();
	$scope.cons = refresh();
  }, $scope.refreshInterval * 1000); // the refresh interval must be in millisec
});