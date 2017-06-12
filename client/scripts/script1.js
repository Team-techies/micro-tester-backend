var app = angular.module('myTool', []);
app.controller('addCard', function ($scope,$http) {
    $scope.apps=[];
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
});