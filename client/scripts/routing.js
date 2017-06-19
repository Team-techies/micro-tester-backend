var app = angular.module('microTester');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    /*  $urlRouterProvider.otherwise("/overview");*/

    $stateProvider
        .state('overview', {
            url: "/overview",
            templateUrl: "../views/overview.html"
        })
        .state('board', {
            url: "/board",
            templateUrl: "../views/board.html"
        })
        .state('documents', {
            url: "/documents",
            templateUrl: "../views/documents.html"
        })
        .state('testClient', {
            url: "/testClient",
            templateUrl: "../views/tester.html",
            params:{
                suite:{},
                requests:[]
            }
        })
        .state('appSettings', {
            url: "/appSettings",
            templateUrl: "../views/appSettings.html"
        })
        .state('applicationSettings', {
            url: "/applicationSettings",
            templateUrl: "../views/applicationSettings.html"
        })
        .state('testSuiteSettings', {
            url: "/testSuiteSettings",
            templateUrl: "../views/testSuiteSettings.html"
        })
        .state('existingTestSuite', {
            url: "/existingTestSuite",
            templateUrl: "../views/existingTestSuite.html"
        })
}]);