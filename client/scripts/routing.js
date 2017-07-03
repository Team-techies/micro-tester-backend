var app = angular.module('microTester');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/overview");

$stateProvider
 .state('dashboardShowApps', {
            url: "/dashboardShowApps",
            templateUrl: "../views/Dashboard_showApps.html"
        })
           .state('dashboardAddApps', {
            url: "/dashboardAddApps",
            templateUrl: "../views/Dashboard_addApp.html"
        })

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
        .state('reports', {
            url: "/reports",
            templateUrl: "../views/reports.html"
        })
        .state('testClient', {
            url: "/testClient",
            templateUrl: "../views/tester.html",
            params: {
                suite: {},
                requests: []
            }
        })
        .state('testClient.testerHeader', {//nested state [products is the nested state of business state]
            url: "/testerHeader",
            templateUrl: "../views/testerHeader.html"

        })
        .state('testClient.testerBody', {//nested state [products is the nested state of business state]
            url: "/testerBody",
            templateUrl: "../views/testerBody.html"

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
            
            controller: "SettingsController",
            templateUrl: "../views/testSuiteSettings.html"
        })
        
        .state('testSuiteSettings.testAppsettings', {//nested state [products is the nested state of business state]
            url: "/testAppsettings",
            templateUrl: "../views/testSuite_app.html"

        })

          .state('testSuiteSettings.testTSuiteSettings', {//nested state [products is the nested state of business state]
            url: "/testTSuiteSettings",
            templateUrl: "../views/testSuite_tester.html"

        })
        .state('existingTestSuite', {
            url: "/existingTestSuite",
            templateUrl: "../views/existingTestSuite.html"
        })
        
}]);