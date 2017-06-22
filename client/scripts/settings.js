var app = angular.module('microTester');

app.controller('SettingsController', ['$state', '$scope', '$http', function ($state, $scope, $http, $window) {

    $scope.data = false;
    $scope.read = true;
    $scope.appData = {};

    function onload() {
        $state.go('testSuiteSettings.testAppsettings');
        /*alert();*/
    }
    onload();

    $scope.getUser = function () {
        console.log("hell0");
        $http({
            url: '/getApp',
            method: "GET",
            // data: $scope.user,
            // headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                $scope.name = response.data.name;
                $scope.email = response.data.email;
                $scope.appData = response.data.doc;
                $scope.appData.unScheduled = !$scope.appData.isScheduled;
            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });
    };

    $scope.appConfig = function () {
        if (!$scope.data) {
            $scope.data = true;
            $scope.read = false;
        }
        else {
            $http({
                url: '/configApp',
                method: "POST",
                headers: { 'ContentType': 'application/json' },
                data: $scope.appData || {}
            }).then(function (response) {
                console.log(response.data.stat);
                if (response.data.stat) {
                    $scope.data = false;
                    $scope.read = true;
                } else if (response.data.msg === "please login to create app ") {
                    $window.location.href = '../views/index.html';
                }
                else {
                    alert(response.data.msg);
                }
            }, function (err) {
                console.log(err);
            });
        }


    }


}]);


app.controller('TestSuiteSettingsController', ['$state', '$scope', '$http', function ($state, $scope, $http, $window) {

    $scope.suiteConfig = function () {
        console.log($scope.testsuite);
        if (!$scope.data) {
            $scope.data = true;
            $scope.read = false;
        }
        else {
            $http({
                url: '/configSuite',
                method: "POST",
                headers: { 'ContentType': 'application/json' },
                data: $scope.testsuite || {}
            }).then(function (response) {
                console.log(response.data.stat);
                if (response.data.stat) {
                    $scope.data = false;
                    $scope.read = true;
                    for (var i = 0; i < $scope.suites.length; i++) {
                        if ($scope.suites[i]._id === $scope.testsuite._id) {
                            $scope.suites[i] = response.data.Data;
                            $scope.testsuite.unScheduled = !$scope.testsuite.isScheduled;
                        }
                        //console.log($scope.testsuite);
                    }
                    $scope.testsuite = response.data.Data;
                } else if (response.data.msg === "please login to create app ") {
                    $window.location.href = '../views/index.html';
                }
                else {
                    alert(response.data.msg);
                }
            }, function (err) {
                console.log(err);
            });
        }


    }

    console.log($scope.testsuite);
    $scope.showTestSuiteConfiguration = false;

    $scope.showConfiguration = function () {
        $scope.data = false;
        $scope.read = true;
        if ($scope.suite != null) {
            for (var i = 0; i < $scope.suites.length; i++) {
                if ($scope.suites[i]._id == $scope.suite._id) {
                    $scope.testsuite = $scope.suites[i];
                    $scope.testsuite.unScheduled = !$scope.testsuite.isScheduled;
                }
                $scope.showTestSuiteConfiguration = true;
                //console.log($scope.testsuite);
            }
        }

    }

    $scope.getTestSuite = function () {

        $http({
            method: "GET",
            url: "/getTestSuite",
        }).then(function successCallback(response) {
            if (response.data.stat) {
                if (response.data.doc.length != 0) {
                    $scope.suites = response.data.doc;
                }
                else {
                    $scope.suites = undefined;
                }

            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function errorCallback(err) {
            console.log(response.data.msg);
            alert(response.data.msg);

        });
    };



}]);