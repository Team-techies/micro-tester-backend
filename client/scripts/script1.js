var app = angular.module('myTool', []);
app.controller('addCard', function ($scope,$http) {
    $scope.apps=[];
    $scope.app={};
    $scope.appData={};
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
           else{
                alert("user not loggedIn");
           }
        },function (err) {
                console.log(err);
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
               $scope.appData=response.data.doc;
        console.log($scope.appData);
           }
           else{
                alert("user not loggedIn");
           }
        },function (err) {
                console.log(err);
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
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                console.log(err);
            });
    };
    
});