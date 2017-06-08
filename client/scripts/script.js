var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope,$http) {
    $scope.registerStatus = false;
     $scope.loginStatus = false;
     $scope.alertMsg = false;
    $scope.usrDetails = {};
    $scope.login = function () {
        //console.log("hello");
         $scope.registerStatus = false;
        $scope.loginStatus = true;
    };
      $scope.register = function () {
        //console.log("hello");
         $scope.loginStatus = false;
        $scope.registerStatus = true;
    };
     $scope.emailCheck = function () {
        //console.log("hello");
        var checkEmail={
            'email': $scope.usrDetails.email
        };
        $http({
            url: '/api/emailCheck',
            method: "POST",
            data: checkEmail,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
               $scope.alertMsg = true;
           }
        },function (err) {
                console.log(err);
            });
    };
    $scope.registerUser = function () {

        $http({
            url: '/api/registerUser',
            method: "POST",
            data: $scope.usrDetails,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
               $scope.registerStatus = false;
               $scope.loginStatus=true;
               alert("you registered successfully now login");
           }
           else{
                alert("you registration failed pls try again");
           }
        },function (err) {
                console.log(err);
            });
    };

});