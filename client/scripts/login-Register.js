var app = angular.module('microTester');

// ############ Login Controller ############

app.controller('LoginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.registerStatus = false;
    $scope.loginStatus = false;
    $scope.alertMsg = false;
    $scope.newUser = {};
    $scope.user = {};

    $scope.login = function () {
        $http({
            url: '/checkUser',
            method: "POST",
            data: $scope.user,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                $window.location.href = '../views/dashboard.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });
    };

}]);

app.controller('RegisterController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.registerStatus = false;
    $scope.loginStatus = false;
    $scope.alertMsg = false;
    $scope.newUser = {};
    $scope.password="";
    $scope.user = {};
    $scope.confirmPassword = false;
    $scope.reEnterPassword = function() {
        
        if ($scope.password === $scope.newUser.pwd) {
            $scope.confirmPassword = true;
        }

    };

    $scope.registerUser = function () {

        $http({
            url: '/api/registerUser',
            method: "POST",
            data: $scope.newUser,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response.data.stat);
            if (response.data.stat) {
                alert(response.data.msg);
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });
    };

}]);

