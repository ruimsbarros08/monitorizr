'use strict';

app.controller("monthCtrl", function ($scope, $rootScope, dayData) {
	//Data from the API
    $scope.data = dayData;

    //Radio1
    $scope.radio1 = {"value": "anual"};
	$scope.dataOptions = [
      {"value": "anual", "text": "Visualização anual"},
      {"value": "homolog", "text": "Visualização homóloga"}
    ];

    //Radio1
    $scope.radio2 = {"value": "table"};
    $scope.viewOptions = [
      {"value": "table", "text": "Tabela"},
      {"value": "chart", "text": "Gráfico"}
    ];
	
	//Enable/Disable Year and Month
	$scope.yearDisabled = false;
	$scope.monthDisabled = true;
    $scope.updateData = function(option) {
    	if (option == "anual"){
    		$scope.yearDisabled = false;
    		$scope.monthDisabled = true;
    		$scope.type = "Mês";
    		$scope.data2dis = $scope.months;
    		$scope.data2charts = parsing($scope.data2dis);
    		$scope.highchartsNgConfig2 = update_chart($scope.data2charts);
    	}
    	else if (option == "homolog"){
    		$scope.yearDisabled = true;
    		$scope.monthDisabled = false;
    		$scope.type = "Ano";
    		for (var i=0; i < $scope.years.length; i++){
				$scope.years[i].value = 0;
			}
			$scope.data2dis = $scope.parse_years();
			$scope.data2charts = parsing($scope.data2dis);
			$scope.highchartsNgConfig2 = update_chart($scope.data2charts);
    	}
    };

    //Change table/chart
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
	$scope.year = new Date ().getFullYear();
	$scope.month = new Date ().getMonth();
	$scope.type = "Mês";

	//Update year when dropdown change
	$scope.update_year = function(year){
		$scope.year = year;
		for (var i=0; i < $scope.months.length; i++){
			$scope.months[i].value = 0;
		}
		$scope.data2dis = $scope.parse_months();
		$scope.data2charts = parsing($scope.data2dis);
		$scope.highchartsNgConfig2 = update_chart($scope.data2charts);
	};

	//Update month when dropdown change
	$scope.update_month = function(month){
		$scope.month = month;
		for (var i=0; i < $scope.years.length; i++){
			$scope.years[i].value = 0;
		}
		$scope.data2dis = $scope.parse_years();
		$scope.data2charts = parsing($scope.data2dis);
		$scope.highchartsNgConfig2 = update_chart($scope.data2charts);
	};

	//Get data when anual
    $scope.months = [{id: 0, name:"Janeiro", value: 0},
					{id: 1, name:"Fevereiro", value: 0},
					{id: 2, name:"Março", value: 0},
					{id: 3, name:"Abril", value: 0},
					{id: 4, name:"Maio", value: 0},
					{id: 5, name:"Junho", value: 0},
					{id: 6, name:"Julho", value: 0},
					{id: 7, name:"Agosto", value: 0},
					{id: 8, name:"Setembro", value: 0},
					{id: 9, name:"Outubro", value: 0},
					{id: 10, name:"Novembro", value: 0},
					{id: 11, name:"Dezembro", value: 0}];
    $scope.parse_months = function () {
        for (var i=0; i < $scope.data.length; i++)
        {
            var date = new Date ($scope.data[i][0]);
			if ($scope.year == date.getFullYear())
			{
				var month = date.getMonth();
				$scope.months[month].value = $scope.months[month].value + $scope.data[i][1];
				$scope.months[month].value = Math.round($scope.months[month].value * 100) / 100;
			}
        }
        return $scope.months
    };

	//Get data when homolog
	$scope.years = [{name: $scope.year-6, value: 0},
					{name: $scope.year-5, value: 0},
					{name: $scope.year-4, value: 0},
					{name: $scope.year-3, value: 0},
					{name: $scope.year-2, value: 0},
					{name: $scope.year-1, value: 0},
					{name: $scope.year, value: 0}];
    $scope.parse_years = function () {
        for (var i=0; i < $scope.data.length; i++)
        {
            var date = new Date ($scope.data[i][0]);
			if ($scope.month == date.getMonth())
			{
				var year = date.getFullYear();
				for (var j=0; j < $scope.years.length; j++){
					if ($scope.years[j].name == year){	
						$scope.years[j].value = $scope.years[j].value + $scope.data[i][1];
						$scope.years[j].value = Math.round($scope.years[j].value * 100) / 100;
					}
				}
			}
        }
        return $scope.years;
    };

    $scope.data2dis = $scope.parse_months();

	var parsing = function (data) {
		var xaxis = [];
		var yaxis = [];
		for (var i=0; i<data.length; i++){
			xaxis.push(data[i].name);
			yaxis.push(data[i].value);
		}
		return [xaxis, yaxis]
	}

	$scope.data2charts = parsing($scope.data2dis);

    //Chart config
    var update_chart = function(data) {
    	     return {
	            options: {
	                chart: {
	                    type: 'column',
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
	                },
	            },
	            series: [{
	            	showInLegend: false, 
	                name: 'Energia',
	                data: data[1],
	            }],
	            title: {
	                //text: 'Consumo Energético Mensal'
	                text: ''
	            },
	            xAxis: {
	                categories: data[0],
	                currentMin: 0,
	                currentMax: data[0].length-1,
	                title: {
	                    //text: $scope.type
	                    text: ""
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
	                max: Math.max.apply(Math, data[1])*1.2,
	                title: {
	                    //text: 'Energia (kWh)'
	                    text: ''
	                }
	            },
	            legend: {
	                enabled: false
	            }
	        };
	    };

	    $scope.highchartsNgConfig2 = update_chart($scope.data2charts);

});