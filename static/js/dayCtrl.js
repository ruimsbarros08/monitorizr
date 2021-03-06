'use strict';

app.controller("dayCtrl", function ($scope, $rootScope, dayData, $filter) {
    $scope.raw_data = dayData;
    $scope.nweeks = Math.ceil($scope.raw_data.length / 7);

    $scope.parse_data = function () {
        var days    = [];
        var energy  = [];
        for (var i=0; i < $scope.raw_data.length; i++)
        { 
            var date = new Date ($scope.raw_data[i][0]);
            var date_str = date.toDateString();
            //$scope.raw_data[i][0] = date_str;
            $scope.raw_data[i][1] = Math.round($scope.raw_data[i][1] * 100) / 100;
            //days.push(date_str);
            days.push($scope.raw_data[i][0]);
            energy.push($scope.raw_data[i][1]);
        }
        return [days, energy]
    };
    
    $scope.radio2 = {"value": "table"};
    $scope.viewOptions = [
      {"value": "table", "text": "Tabela"},
      {"value": "chart", "text": "Gráfico"}
    ];

    $scope.tableView = true;
    $scope.chartView = false;
    $scope.updateView = function(option) {
        if (option == "table"){
            $scope.tableView = true;
            $scope.chartView = false;
        }
        else if (option == "chart"){
            $scope.tableView = false;
            $scope.chartView = true;
        }
    };

    //Defaults
    $scope.data     = $scope.parse_data();
    $scope.week     = 0;
    $scope.week_limit = parseInt($scope.data[0].length/7)
    $scope.style1 = "next disabled";
    $scope.style2 = "previous enabled";

    $scope.week_chooser = function() {
        var data2dis_days   = [];
        var data2dis_energy = [];
        var data2dis_raw    = [];
        for (var i = $scope.data[0].length - 7*$scope.week - 7; i < $scope.data[0].length - 7*$scope.week; i++){
            if ($scope.data[1][i] != undefined){
                data2dis_days.push($scope.data[0][i]);
                data2dis_energy.push($scope.data[1][i]);
                data2dis_raw.push([$scope.raw_data[i][0], $scope.raw_data[i][1]]);
            }
        }
        return [data2dis_days, data2dis_energy, data2dis_raw]
    };

    $scope.update_chart = function() {
        for (var i=0; i < $scope.data2dis[0].length; i++){
            $scope.data2dis[0][i] = $filter('date')($scope.data2dis[0][i], "dd/MM/yyyy")
        }
    return {
            options: {
                chart: {
                    type: 'column',
                    // Edit chart spacing
                    spacingBottom: 75,
                    spacingTop: 50,
                    spacingLeft: 50,
                    spacingRight: 50
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            series: [{
                showInLegend: false, 
                name: 'Energia',
                data: $scope.data2dis[1]
            }],
            title: {
                //text: 'Consumo Energético Diário'
                text: ''
            },
            loading: false,
            xAxis: {
                categories: $scope.data2dis[0],
                currentMin: 0,
                currentMax: $scope.data2dis[0].length-1,
                title: {
                    //text: 'Dia'
                    text: ''
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
                max: Math.max.apply(Math, $scope.data2dis[1])*1.2,
                title: {
                    //text: 'Energia (kWh)'
                    text: ''
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
        if ($scope.week <= 0){
            $scope.week = 0;
            $scope.style1 = "next disabled";
        }
        else if ($scope.week > $scope.week_limit){
            $scope.week = $scope.week-1;
            $scope.style2 = "previous disabled";
        }
        else{
            $scope.style1 = "next enabled";
            $scope.style2 = "previous enabled";
        }
        $scope.data2dis = $scope.week_chooser();
        $scope.highchartsNgConfig = $scope.update_chart();
    };

    $scope.newer = function() {
        $scope.week = 0;
        $scope.data2dis = $scope.week_chooser();
        $scope.highchartsNgConfig = $scope.update_chart();
    };

    $scope.elder = function() {
        $scope.week = $scope.nweeks-1;
        $scope.data2dis = $scope.week_chooser();
        $scope.highchartsNgConfig = $scope.update_chart();     
    };

});