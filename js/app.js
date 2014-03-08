'use strict';

var start = 0;
var end = (new Date()).getTime();

var app = angular.module('parfois_monitor', ['ui.router', 'chieffancypants.loadingBar']);

app.config(function ($stateProvider, $urlRouterProvider) {
    var     home = {
                name: 'home',
                url: '/home',
                templateUrl: "tpl/home.html"
            },
            day = {
                name: 'day',
                url: '/day',
                templateUrl: "tpl/day.html",
                resolve: {
                    dayData: function($q, $http){
                        var deferred = $q.defer();
                        var url = BASE_URL + "/emoncms/feed/data.json?&id="+feedId+"&start="+start+"&end="+end+"&dp=500&apikey="+apiKey;
                        $http.get(url).success(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                },
                controller: function ($scope, dayData) {
                    var series = dayData;
                    $scope.data = dayData;

                    chart(series);

                }
            },
            month = {
                name: 'month',
                url: '/month',
                templateUrl: "tpl/month.html"
            },
            team = {
                name: 'team',
                url: '/team',
                templateUrl: "tpl/team.html"
            },
            fisrt = {
                name: 'first',
                url: '/',
                templateUrl: "tpl/home.html"
            }

        $stateProvider.state(home);
        $stateProvider.state(day);
        $stateProvider.state(month);
        $stateProvider.state(team);
});

app.controller('mainCtrl', function ($scope, $state) {
    
});