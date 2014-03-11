'use strict';

var start = 1388534400000;
var end = (new Date()).getTime();

var app = angular.module('parfois_monitor', ['ui.router', 'chieffancypants.loadingBar', "highcharts-ng"]);

/*
app.factory("instant_cons", function($q, $http) {
    var deferred = $q.defer();
    var url = BASE_URL + "/emoncms/feed/data.json?&id=3&start="+old_t+"&end="+new_t+"&dp=500&apikey=dc1c0ce300c4859934ec0f868671b2e5";
    $http.get(url).success(function(data){
        deferred.resolve(data);
    });
    return deferred.promise;

});

app.controller("main_info", function ($scope, $timeout, instant_cons) {

      $scope.cons = 0;
      var old_t = (new Date()).getTime();
  
      (function update() {
        $timeout(update, 5000);
        var new_t = (new Date()).getTime();
        $scope.cons = instant_cons;
        var old_t = new_t;
      }());

});
*/
