'use strict';

var app = app || angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController as homeCtrl',
            templateUrl: 'pages/Home/home.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
