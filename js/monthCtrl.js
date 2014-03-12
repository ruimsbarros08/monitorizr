'use strict';

app.controller("monthCtrl", function ($scope, dayData) {
                    $scope.data = dayData;
					$scope.year = 2014;
					
					$scope.update_year = function(year){
						$scope.year = year;
						$scope.months     = $scope.parse_months();
					};

                    $scope.parse_months = function () {
                        var months = [0,0,0,0,0,0,0,0,0,0,0,0]
                        for (var i=0; i < $scope.data.length; i++)
                        {
                            var date = new Date ($scope.data[i][0]);
							if ($scope.year == date.getFullYear())
							{
								var month = date.getMonth();
								months[month] = months[month] + $scope.data[i][1];
								months[month] = Math.round(months[month] * 100) / 100
							}
                        }
                        return months
                    };

                    $scope.months     = $scope.parse_months();

                });