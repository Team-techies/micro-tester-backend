var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope,$http,$window) {
    $scope.registerStatus = false;
     $scope.loginStatus = false;
     $scope.alertMsg = false;
    $scope.newUser = {};
    $scope.user={};

    $scope.schedule=function(){
         $http({
            url: '/scheduler',
            method: "GET",
        }).then(function (response) {
           console.log(response.data.stat);
        //    if(!response.data.stat && response.data.stat!=undefined){
        //        alert("user doesn't found");
        //    }
          if(response.data.stat){
              console.log("schedule started");
           }
           else{
               alert("scheduler failed to start");
           }
        },function (err) {
                console.log(err);
            });
    }
    // $scope.schedule();
    $scope.login = function () {
       $http({
            url: '/checkUser',
            method: "POST",
            data: $scope.user,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
           console.log(response.data.stat);
        //    if(!response.data.stat && response.data.stat!=undefined){
        //        alert("user doesn't found");
        //    }
          if(response.data.stat){
              $window.location.href = '../views/dashboard.html';
           }
           else{
               alert("user doesn't found");
           }
        },function (err) {
                console.log(err);
            });
    };
    //   $scope.register = function () {
    //     //console.log("hello");
    //      $scope.loginStatus = false;
    //     $scope.registerStatus = true;
    // };
     $scope.emailCheck = function () {
        //console.log("hello");
        var checkEmail={
            'email': $scope.usrDetails.email
        };
        $http({
            url: '/api/emailCheck',
            method: "POST",
            data: checkEmail,
            headers: { 'Content-Type': 'application/json' }
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
            data: $scope.newUser,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
               alert(response.data.msg);
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                console.log(err);
        });
    };

});