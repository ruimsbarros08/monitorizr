'use strict';

app.service('UserService',function ($http, $q){
  return {
    //getInstantData: function(feed){
    getEnergy: function(){
        var new_t = (new Date()).getTime();
        var old_t = new_t - 3600000*0.1;

        //var url = BASE_URL+"/emoncms/feed/data.json?&id="+feed+"&start="+old_t+"&end="+new_t+"&dp=500&apikey="+apiKey;
        var url = BASE_URL+"/emoncms/feed/data.json?&id="+feedId_instant_energy+"&start="+old_t+"&end="+new_t+"&dp=500&apikey="+apiKey;

        var def = $q.defer();
        $http.get(url).success(function(data){
            def.resolve(data);
        });
        return def.promise;

          //return $http.get(url);
    },
    getTemp: function(){
        var new_t = (new Date()).getTime();
        var old_t = new_t - 3600000*0.1;

        //var url = BASE_URL+"/emoncms/feed/data.json?&id="+feed+"&start="+old_t+"&end="+new_t+"&dp=500&apikey="+apiKey;
        var url = BASE_URL+"/emoncms/feed/data.json?&id="+feedId_dayly_temp+"&start="+old_t+"&end="+new_t+"&dp=500&apikey="+apiKey;
        var def = $q.defer();
        $http.get(url).success(function(data){
            def.resolve(data);
        });
        return def.promise;
  },
      getHum: function(){
        var new_t = (new Date()).getTime();
        var old_t = new_t - 3600000*0.1;

        //var url = BASE_URL+"/emoncms/feed/data.json?&id="+feed+"&start="+old_t+"&end="+new_t+"&dp=500&apikey="+apiKey;
        var url = BASE_URL+"/emoncms/feed/data.json?&id="+feedId_dayly_hum+"&start="+old_t+"&end="+new_t+"&dp=500&apikey="+apiKey;
          
        var def = $q.defer();
        $http.get(url).success(function(data){
            def.resolve(data);
        });
        return def.promise;
  }

}
});

app.controller('main_info', function ($scope, UserService, $interval) {

  $scope.refreshInterval = 5;

  $scope.refresh = function() {
    //UserService.getInstantData(feedId_instant_energy).then(function(data) {
    //    $scope.cons = data[0][1];
    //});

    $scope.$watchCollection('cons', function() {
        UserService.getEnergy().then(function(data) {
            $scope.cons = data[0][1];
        }); 
    });

    $scope.$watchCollection('temp', function() {
        UserService.getTemp().then(function(data) {
            $scope.temp = data[0][1].toFixed(2);
        }); 
    });

    $scope.$watchCollection('hum', function() {
        UserService.getHum().then(function(data) {
            $scope.hum = data[0][1].toFixed(2);
        }); 
    });

  };

  $scope.refresh();
  $interval(function() { 
    $scope.refresh();
  }, $scope.refreshInterval * 1000);
});
