'use strict';

app.service('weatherSrvc',function ($http, $q){
  return {
    getWeatherData: function(){
      var url = BASE_URL+"/parfois/getWeather";
      var response = {};
      $http.get(url).success(function(data){
        response.value = data;
      });
      return response;
    }
  }
});

app.controller('weatherCtrl', function ($scope, weatherSrvc, $interval) {

  $scope.refreshInterval = 60*5;

  $scope.refresh = function() {
    $scope.weather = weatherSrvc.getWeatherData();
  };

  $scope.refresh();
  $interval(function() { 
    $scope.refresh();
  }, $scope.refreshInterval * 1000);
});
