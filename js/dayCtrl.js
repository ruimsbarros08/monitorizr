'use strict';

app.controller("dayCtrl", function ($scope, dayData) {
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

                });