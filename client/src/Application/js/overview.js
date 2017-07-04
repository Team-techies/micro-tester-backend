var app = angular.module('microTester');

app.controller('OverviewController',['$scope', '$http', '$window', function($scope, $http, $window){

    $scope.appData = {};
    $scope.user = {};
    // $scope.getData=function(data){
    //      $http({
    //         url: '/api/call/'+data,
    //         method: "GET",
    //         // data: $scope.user,
    //         // headers: { 'Content-Type': 'application/json' }
    //     }).then(function (response) {
    //        console.log(response.data);
    //     },function (err) {
    //             console.log(err);
    //         });
    // };
    //  $scope.getData("hello");
    $scope.changePwd = function () {
        console.log("hell0");
        $http({
            url: '/api/changePwd',
            method: "POST",
            data: $scope.user,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                alert(response.data.msg);
                $window.location.href = '../../../src/Registration-Login/views/index.html';
            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../../../src/Registration-Login/views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });
    };
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
            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../../../src/Registration-Login/views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });
    };
    $scope.deleteApp = function () {
        console.log("hell0");
        var confm = confirm("You want to delete the application " + $scope.appData.title);
        if (confm == true) {
            $http({
                url: '/deleteApp',
                method: "GET",
                // data: $scope.user,
                // headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                console.log(response.data.stat);
                if (response.data.stat) {
                    $scope.appData = {};
                    $window.location.href = '../../../src/Dashboard/views/dashboard.html';
                } else if (response.data.msg === "please login to create app ") {
                    $window.location.href = '../../../src/Registration-Login/views/index.html';
                }
                else {
                    alert(response.data.msg);
                }
            }, function (err) {
                console.log(err);
            });
        }

    };
    $scope.logout = function () {
        console.log("logout");
        $http({
            url: '/logout',
            method: "GET"
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                $window.location.href = '../../../src/Registration-Login/views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });

    };
    $scope.gotoHome = function () {

        $window.location.href = '../../../src/Dashboard/views/dashboard.html';
    }
    $scope.data = false
    $scope.read = true;

    $scope.appEdit = function () {
        if (!$scope.data) {
            $scope.data = true;
            $scope.read = false;
        }
        else {
            $http({
                url: '/updateApp',
                method: "POST",
                headers: { 'ContentType': 'application/json' },
                data: $scope.appData || {}
            }).then(function (response) {
                console.log(response.data.stat);
                if (response.data.stat) {
                    $scope.data = false;
                    $scope.read = true;
                } else if (response.data.msg === "please login to create app ") {
                    $window.location.href = '../../../src/Registration-Login/views/index.html';
                }
                else {
                    alert(response.data.msg);
                }
            }, function (err) {
                console.log(err);
            });
        }


    }

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
                    $window.location.href = '../../../src/Registration-Login/views/index.html';
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