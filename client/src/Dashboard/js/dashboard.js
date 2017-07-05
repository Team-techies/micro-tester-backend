var app = angular.module('microTester');

app.controller('DashboardController', ['$scope','$http','$window', function($scope, $http, $window){

     $scope.apps=[];
    $scope.app={};
    $scope.getUser = function () {
        console.log("hell0");
       $http({
            url: '/getClientApps',
            method: "GET",
            // data: $scope.user,
            // headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
              $scope.name=response.data.name;
               $scope.email=response.data.email;
               $scope.apps=response.data.doc;
           }
           else if(response.data.msg==="please login to create app "){
               $window.location.href = '../../../src/Registration-Login/views/index.html';
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                alert(err);
            });
    };
     $scope.show = function (data) {
        console.log("hell0");
        console.log(data._id);
       $http({
            url: '/getClientApp/'+data._id,
            method: "GET",
            // data: $scope.user,
            // headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
               $window.location.href = '../../../src/Application/views/appDetail.html';
        console.log($scope.appData);
           }else if(response.data.msg==="please login to create app "){
               $window.location.href = '../../../src/Registration-Login/views/index.html';
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                alert(err);
            });
    };
    $scope.add = function () {
        console.log("hell0");
       $http({
            url: '/createClient/',
            method: "POST",
            data: $scope.app,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
               alert(response.data.msg);
                location.reload();
                $scope.app={};
           }else if(response.data.msg==="please login to create app "){
               $window.location.href = '../../../src/Registration-Login/views/index.html';
               location.reload();
                $scope.app={};
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                alert(err);
            });
    };

    $scope.logout=function(){
        console.log("logout");
        $http({
            url: '/logout',
            method: "GET"
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
               $window.location.href = '../../../src/Registration-Login/views/index.html';
           }else if(response.data.msg==="please login to create app "){
               $window.location.href = '../../../src/Registration-Login/views/index.html';
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                alert(err);
            });

    }
    

}]);