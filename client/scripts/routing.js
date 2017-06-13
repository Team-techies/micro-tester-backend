var app = angular.module('myRoute',['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  /*  $urlRouterProvider.otherwise("/overview")*/

    $stateProvider
        .state('overview', {
            url: "/overview",
            templateUrl: "../views/overview.html"
        })
        .state('board', {
            url: "/board",
            templateUrl: "../views/board.html"
        })
        .state('documents', {
            url: "/documents",
            templateUrl: "../views/documents.html"
        })
        .state('testClient', {
            url: "/testClient",
            templateUrl: "../views/tester.html"
        })
        .state('legal', {
            url: "/legal",
            templateUrl: "../views/legal.html"
        })

}]);

app.controller('routeController', function ($scope,$http,$window) {
    $scope.appData={};
    $scope.getUser = function () {
        console.log("hell0");
       $http({
            url: '/getApp',
            method: "GET",
            // data: $scope.user,
            // headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
           console.log(response.data.stat);
           if(response.data.stat){
              $scope.name=response.data.name;
               $scope.email=response.data.email;
               $scope.appData=response.data.doc;
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                console.log(err);
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
               $window.location.href = '../views/index.html';
           }
           else{
                alert(response.data.msg);
           }
        },function (err) {
                console.log(err);
            });

    };
     $scope.gotoHome=function(){

        $window.location.href = '../views/dashboard.html';
     }
});

app.controller('formController', function ($scope, $http) {
        $scope.reqParam = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
        $scope.reqData = { "id": "", "selectedReqType": "", "url": "", "header": {}, "body": "", "status": "" };
        $scope.reqData.id = undefined;
        $scope.showData = [];
        var id = 0;
        var counter = 0;

        $scope.reset = function () {
            $scope.rowMaker = [{ "key": "", "value": "" }];
        }

        $scope.deleteRow = function (index) {
            if ($scope.rowMaker.length != 1 || index != $scope.rowMaker.length - 1) {
                $scope.rowMaker.splice(index, 1);
            }

        };
        // header row maker

        $scope.rowValue = { "key": "", "value": "" };
        $scope.rowMaker = [$scope.rowValue];
        $scope.addRow = function (index) {

           
            if (index == $scope.rowMaker.length - 1) {
                $scope.rowMaker.push({ "key": "", "value": "" });
            }

        }

        $scope.rowBuilder = function () {
            var headerObj = {};

            for (var i = 0; i < $scope.rowMaker.length; i++) {

                if ($scope.rowMaker[i].key && $scope.rowMaker[i].key != "" && $scope.rowMaker[i].value && $scope.rowMaker[i].value != "")
                    headerObj[$scope.rowMaker[i].key] = $scope.rowMaker[i].value;
            }
          
            $scope.headerString = angular.toJson(headerObj);
            return $scope.headerString;
        };



        $scope.saveFormData = function () {

            if ($scope.reqData.id === undefined) {
                id = id + 1;

                $scope.reqData.status = "Waiting";
                $scope.statusClassWaiting = "glyphicon glyphicon-time";
                $scope.reqData.id = id;
                $scope.reqData.header = $scope.rowBuilder();
                $scope.showData.push($scope.reqData);
                $scope.reqData = {};
                $scope.rowMaker = [{ "key": "", "value": "" }];
            }
            else {
                $scope.reqData.header = $scope.rowBuilder();
                for (let i = 0; i < $scope.showData.length; i++) {

                    if ($scope.reqData.id === $scope.showData[i].id) {
                        $scope.showData[i] = $scope.reqData;
                        $scope.reqData = {};
                    }
                }
                $scope.rowMaker = [{ "key": "", "value": "" }];
            }
        };

        $scope.edit = function (data) {
            counter = 0;
            console.log($scope.rowMaker);
            $scope.rowMaker = [];
            var jsonHeader = angular.fromJson(data.header);
            angular.forEach(jsonHeader, function (value, key) {
                $scope.rowMaker.push({ "key": key, "value": value });
            });
            $scope.rowMaker.push({ "key": "", "value": "" });
            $scope.reqData = angular.copy(data);
            
                $scope.reqData.status = "Waiting";
                $scope.statusClassWaiting = "glyphicon glyphicon-time";

        };

        $scope.delete = function (data) {
            for (let i = 0; i < $scope.showData.length; i++) {

                if (data.id === $scope.showData[i].id) {
                    $scope.showData.splice(i, 1);

                }
            }
        };

        this.testApi = function () {
             counter = 0;

            for (let i = 0; i < $scope.showData.length; i++) {
                $scope.showData[i].status = "Processing";
                $scope.statusClassProcessing = "fa fa-spinner fa-pulse fa-3x fa-fw";

            }

            hitApi($scope.showData[0]);

        }

      
        var hitApi = function (data) {

            var jsonHeader = angular.fromJson(data.header);

       
            $http({
                method: data.selectedReqType,
                headers: jsonHeader,
                url: data.url,
                data: data.body || {}
            }).then(function successCallback(response) {
             
                if (response.status === 200) {
                    $scope.showData[counter].status = "Successfull";
                    $scope.statusClassSuccessfull = "glyphicon glyphicon-ok text-success";
                }
                counter = counter + 1;
                if (counter < $scope.showData.length) {
                    hitApi($scope.showData[counter]);
                }


            }, function errorCallback(err) {
              
                $scope.showData[counter].status = "Failed";
                $scope.statusClassFailed = "glyphicon glyphicon-remove text-danger";
                counter = counter + 1;
                if (counter < $scope.showData.length) {
                    hitApi($scope.showData[counter]);
                }
            });
        };


    


    });
