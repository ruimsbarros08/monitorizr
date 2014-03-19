'use strict';

app.controller("dayCtrl", function ($scope, dayData) {
    $scope.raw_data = dayData;

    $scope.parse_data = function () {
        var days    = [];
        var energy  = [];
        for (var i=0; i < $scope.raw_data.length; i++)
        { 
            var date = new Date ($scope.raw_data[i][0]);
            var date_str = date.toDateString();
            days.push(date_str);
            energy.push($scope.raw_data[i][1]);
        }
        return [days, energy]
    };

    //Defaults
    $scope.data     = $scope.parse_data();
    $scope.price    = 0.1;
    $scope.week     = 0;

    $scope.week_chooser = function() {
        var data2dis_days   = [];
        var data2dis_energy = [];
        for (var i = $scope.data[0].length - 7*$scope.week - 7; i < $scope.data[0].length - 7*$scope.week; i++){
            if ($scope.data[1][i] != undefined){
                data2dis_days.push($scope.data[0][i]);
                data2dis_energy.push($scope.data[1][i]);
            }
        }
        return [data2dis_days, data2dis_energy]
    };

    $scope.update_chart = function() {
    return {
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
                name: 'Energia',
                data: $scope.data2dis[1],
            }],
            title: {
                text: 'Consumo Energético Diário'
            },
            loading: false,
            xAxis: {
                categories: $scope.data2dis[0],
                currentMin: 0,
                currentMax: $scope.data2dis[0].length-1,
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
                    text: 'Energia (kWh)'
                }
            },
            legend: {
                enabled: false
            },
        };
    };

    //Defaults
    $scope.data2dis = $scope.week_chooser();
    $scope.highchartsNgConfig = $scope.update_chart();

    $scope.update_week = function(week_inc) {
        $scope.week = $scope.week + week_inc;
        $scope.data2dis = $scope.week_chooser();
        $scope.highchartsNgConfig = $scope.update_chart();
    };

});