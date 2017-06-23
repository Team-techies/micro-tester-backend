var app = angular.module('microTester', ['ui.bootstrap', 'ui.router', 'angular-cron-jobs']);

app.controller('scheduleController',function($scope,$http){
//     $scope.schedule=function(){
//          $http({
//             url: '/scheduler',
//             method: "GET",
//         }).then(function (response) {
//            console.log(response.data.stat);
//         //    if(!response.data.stat && response.data.stat!=undefined){
//         //        alert("user doesn't found");
//         //    }
//           if(response.data.stat){
//               console.log("schedule started");
//            }
//            else{
//                alert("scheduler failed to start");
//            }
//         },function (err) {
//                 console.log(err);
//             });
//     }
//    // $scope.schedule();
})