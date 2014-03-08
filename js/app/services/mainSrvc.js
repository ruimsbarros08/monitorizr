'use strict';

app.factory('mainSrvc', function ($q, $http) {
	var deferred = $q.defer();
    var url = "http://localhost/api/sections/commercial/allprofiles";
    return $http.get(url).then(function(data){
    	deferred.resolve(data);
    });
});