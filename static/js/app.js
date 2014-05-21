'use strict';

var start = 1388534400000;
var end = (new Date()).getTime();

var app = angular.module('monitor', ['ui.router', 'chieffancypants.loadingBar', "highcharts-ng", "pageslide-directive", 'ui.bootstrap']);

