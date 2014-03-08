$(chart = function (series) {
    $('#chart').highcharts({
        chart: {
            type: 'column',
            margin: [ 50, 50, 100, 80]
        },
        title: {
            text: 'Energy Consumption'
        },
        xAxis: {
            categories: series[0],
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
                text: 'Energy Consumption (kWh)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Energy: <b>{point.y:.1f} kWh</b>',
        },
        series: [{
            name: 'Energy',
            data: series[1],
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
        }]
    });
});