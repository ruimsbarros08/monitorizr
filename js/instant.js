'use strict';

app.service('UserService',function ($http, $q){
  return {
    getArea: function(id){
      return $http.get("http://openg.fe.up.pt/api/sections/commercial/IPE200/grossproperties/area");
    }
    ,
    getAreaWithQ: function(id){
      var def = $q.defer();
      $http.get("http://openg.fe.up.pt/api/sections/commercial/IPE200/grossproperties/area").success(function(data){
        def.resolve(data.value);
      });
      return def.promise;
    }
    
    ,resourceExample: function(id){
      var response = {};
      $http.get("http://openg.fe.up.pt/api/sections/commercial/IPE200/grossproperties/area").success(function(data){
        response.value = data.value;
      });
      return response;
    }
  }
});

app.controller('main_info', function ($scope, UserService, $interval) {

  $scope.refreshInterval = 5;

  $scope.refresh = function() {
    $scope.cons = UserService.getArea();
    $scope.temp = UserService.getAreaWithQ(); 
    $scope.hum = UserService.resourceExample();
  };

  $scope.refresh();
  $interval(function() { 
    $scope.refresh();
  }, $scope.refreshInterval * 1000);
});