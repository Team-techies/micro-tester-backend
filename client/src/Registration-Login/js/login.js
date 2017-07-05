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
                $window.location.href = '../../../src/Dashboard/views/dashboard.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            alert(err);
        });
    };

}]);