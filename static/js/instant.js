'use strict';

app.service('UserService',function ($http, $q){
  return {
    getInstantData: function(feed){
      var new_t = (new Date()).getTime();
      var old_t = new_t - 3600000*0.1;

      var url = BASE_URL+"/emoncms/feed/data.json?&id="+feed+"&start="+old_t+"&end="+new_t+"&dp=500&apikey="+apiKey;
      var response = {};
      $http.get(url).success(function(data){
        response.value = data.value;
      });
      return response;
    }
  }
});

app.controller('main_info', function ($scope, UserService, $interval) {

  $scope.refreshInterval = 5;

  $scope.refresh = function() {
    $scope.cons = UserService.getInstantData( feedId_instant_energy );
    $scope.temp = UserService.getInstantData( feedId_dayly_temp ); 
    $scope.hum = UserService.getInstantData( feedId_dayly_hum );
  };

  $scope.refresh();
  $interval(function() { 
    $scope.refresh();
  }, $scope.refreshInterval * 1000);
});