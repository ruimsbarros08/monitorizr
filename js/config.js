'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
    var     home = {
                name: 'home',
                url: '/home',
                templateUrl: "tpl/home.html"
            },
            instant = {
                name: 'instant',
                url: '/instant',
                templateUrl: "tpl/instant.html"
            },
            day = {
                name: 'day',
                url: '/day',
                templateUrl: "tpl/day.html",
                resolve: {
                    dayData: "day_feed"
                },
                controller: "dayCtrl"
            },
            month = {
                name: 'month',
                url: '/month',
                templateUrl: "tpl/month.html"
            },
            team = {
                name: 'team',
                url: '/team',
                templateUrl: "tpl/team.html"
            },
            first = {
                name: 'first',
                url: '/',
                templateUrl: "tpl/home.html"
            }

        $stateProvider.state(first);
        $stateProvider.state(home);
        $stateProvider.state(instant);
        $stateProvider.state(day);
        $stateProvider.state(month);
        $stateProvider.state(team);
});
