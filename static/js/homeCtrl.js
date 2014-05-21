'use strict';

app.controller("homeCtrl", function ($scope) {

	$scope.myInterval = 3000;
  	var slides = $scope.slides = [];

  	$scope.slides.push({text: "<a href='#/instant' class='btn btn-success btn-sm'>Energia</a>", image: 'img/carousel/energy.jpg'});
  	$scope.slides.push({text: "<a href='#/temp' class='btn btn-success btn-sm'>Temperatura</a>", image: 'img/carousel/temp.jpg'});
  	$scope.slides.push({text: "<a href='#/hum' class='btn btn-success btn-sm'>Humidade</a>", image: 'img/carousel/humidity.jpg'});

  	$scope.setActive = function(idx) {
    $scope.slides[idx].active=true;
  }

});