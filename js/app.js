'use strict';

var start = 1388534400000;
var end = (new Date()).getTime();

var app = angular.module('parfois_monitor', ['ui.router', 'chieffancypants.loadingBar', "highcharts-ng"]);

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
                    $scope.data = dayData;

                    $scope.parse_days = function () {
                        var days = []
                        for (var i=0; i < $scope.data.length; i++)
                        { 
                            var date = new Date ($scope.data[i][0]);
                            var date_str = date.toDateString();
                            days.push(date_str);
                        }
                        return days
                    };

                    $scope.parse_energy = function () {
                        var energy = []
                        for (var i=0; i < $scope.data.length; i++)
                        {
                            //console.log($scope.data[i][1].toFixed(8));
                            energy.push($scope.data[i][1].toFixed(8));
                        }
                        return energy
                    };

                    $scope.days     = $scope.parse_days();
                    $scope.energy   = $scope.parse_energy();

                    $scope.highchartsNgConfig = {
                        options: {
                            chart: {
                                type: 'column'
                            },
                            tooltip: {
                                style: {
                                    padding: 10,
                                    fontWeight: 'bold'
                                }
                            },
                        },
                        series: [{
                            name: 'Energy',
                            data: $scope.energy,
                            dataLabels: {
                                enabled: true,
                                rotation: -90,
                                color: '#FFFFFF',
                                align: 'right',
                                x: 4,
                                y: 10,
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif',
                                    textShadow: '0 0 3px black'
                                }
                            }
                        }],
                        title: {
                            text: 'Energy Consumption'
                        },
                        loading: false,
                        xAxis: {
                            categories: $scope.days,
                            currentMin: 0,
                            currentMax: 7,
                            title: {
                                text: 'Day'
                            },
                            labels: {
                                rotation: -45,
                                align: 'right',
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Energy (kWh)'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        useHighStocks: false
                    };

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