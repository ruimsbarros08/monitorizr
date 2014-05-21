'use strict';

app.controller("homeCtrl", function ($scope) {

	$scope.myInterval = 3000;
  	var slides = $scope.slides = [];

  	$scope.slides.push({image: 'img/carousel/energy.jpg'});
  	$scope.slides.push({image: 'img/carousel/temp.jpg'});
  	$scope.slides.push({image: 'img/carousel/humidity.jpg'});

  	$scope.setActive = function(idx) {
    $scope.slides[idx].active=true;
  }

});