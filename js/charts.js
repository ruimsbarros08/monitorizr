'use strict';

app.factory("charts", function(data) {

	var parsing = function () {
		var xaxis = [];
		var yaxis = [];
		for (i=0; i<data.length; i++){
			xaxis.push(data[i].name);
			yaxis.push(data[i].value);
		}
		return [xaxis, yaxis]
	}

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
                data: yaxis,
                dataLabels: {
                    enabled: false,
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
                text: 'Consumo Energético Mensal'
            },
            loading: false,
            xAxis: {
                categories: xaxis,
                currentMin: 0,
                currentMax: xaxis.length,
                title: {
                    text: 'Mês'
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
            useHighStocks: false
        };
});