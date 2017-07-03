var app = angular.module('microTester');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboardShowApps");

$stateProvider
 .state('dashboardShowApps', {
            url: "/dashboardShowApps",
            templateUrl: "../views/Dashboard_showApps.html"
        })
           .state('dashboardAddApps', {
            url: "/dashboardAddApps",
            templateUrl: "../views/Dashboard_addApp.html"
        })

    
        
}]);