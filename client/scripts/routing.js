var app = angular.module('myRoute', ['ui.bootstrap', 'ui.router', 'nvd3ChartDirectives', 'angular-cron-jobs']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    /*  $urlRouterProvider.otherwise("/overview");*/

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
        .state('appSettings', {
            url: "/appSettings",
            templateUrl: "../views/appSettings.html"
        })
        .state('applicationSettings', {
            url: "/applicationSettings",
            templateUrl: "../views/applicationSettings.html"
        })
        .state('testSuiteSettings', {
            url: "/testSuiteSettings",
            templateUrl: "../views/testSuiteSettings.html"
        })
        .state('existingTestSuite', {
            url: "/existingTestSuite",
            templateUrl: "../views/existingTestSuite.html"
        })
}]);

app.controller('routeController', function ($scope, $http, $window) {
    $scope.appData = {};
    $scope.user={};
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
                $window.location.href = '../views/index.html';
            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../views/index.html';
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
                $window.location.href = '../views/index.html';
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
        var confm = confirm("You want to delete the application "+$scope.appData.title);
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
                $window.location.href = '../views/dashboard.html';
            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../views/index.html';
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
                $window.location.href = '../views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function (err) {
            console.log(err);
        });

    };
    $scope.gotoHome = function () {

        $window.location.href = '../views/dashboard.html';
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
                    $window.location.href = '../views/index.html';
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
                    $window.location.href = '../views/index.html';
                }
                else {
                    alert(response.data.msg);
                }
            }, function (err) {
                console.log(err);
            });
        }


    }
});

app.controller('formController', ['$scope', '$http', '$modal', '$location', '$window', function ($scope, $http, $modal, $location, $window) {
    $scope.reqParam = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    $scope.reqData = { "id": "", "selectedReqType": "", "url": "", "header": {}, "body": "", "status": "", "startTime": "", "oauthFilter": "false", "responseTime": [] };
    $scope.showData = [];
    $scope.startTime = "";
    $scope.suites = [];
    $scope.testsuite = {};
    var id = 0;
    var counter = 0;
    $scope.data = false
    $scope.read = true;
    $scope.testSuiteArray = ["a", "b", "c", "d", "e", "f"];
    $scope.showTestSuiteConfiguration = false;

    $scope.showConfiguration = function () {

        for (var i = 0; i < $scope.suites.length; i++) {
            if ($scope.suites[i]._id === $scope.suite._id) {
                $scope.testsuite = $scope.suites[i];
            }
            $scope.showTestSuiteConfiguration = true;
            console.log($scope.testsuite);
        }
    }

    $scope.hideConfiguration = function () {
        $scope.showTestSuiteConfiguration = false;
    }

    $scope.suiteConfig = function () {
        console.log($scope.testsuite);
        if (!$scope.data) {
            $scope.data = true;
            $scope.read = false;
        }
        else {
            $http({
                url: '/configSuite',
                method: "POST",
                headers: { 'ContentType': 'application/json' },
                data: $scope.testsuite || {}
            }).then(function (response) {
                console.log(response.data.stat);
                if (response.data.stat) {
                    $scope.data = false;
                    $scope.read = true;
                } else if (response.data.msg === "please login to create app ") {
                    $window.location.href = '../views/index.html';
                }
                else {
                    alert(response.data.msg);
                }
            }, function (err) {
                console.log(err);
            });
        }


    }

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

        if ($scope.reqData.id === "") {
            id = id + 1;

            $scope.reqData.status = "Waiting";
            $scope.statusClassWaiting = "glyphicon glyphicon-time";
            $scope.reqData.id = id;
            $scope.reqData.header = $scope.rowBuilder();
            $scope.showData.push($scope.reqData);
            $scope.reqData = { "id": "", "selectedReqType": "", "url": "", "header": {}, "body": "", "status": "", "startTime": "", "oauthFilter": "false", "responseTime": [] };
            $scope.rowMaker = [{ "key": "", "value": "" }];
        }
        else {
            $scope.reqData.header = $scope.rowBuilder();
            for (let i = 0; i < $scope.showData.length; i++) {

                if ($scope.reqData.id === $scope.showData[i].id) {
                    $scope.showData[i] = $scope.reqData;
                    $scope.reqData = { "id": "", "selectedReqType": "", "url": "", "header": {}, "body": "", "status": "", "startTime": "", "oauthFilter": "false", "responseTime": [] };
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
        //  $scope.showData[0].responseTime.push({"startTime":new Date().getTime(), "endTime":""});
        $scope.showData[0].startTime = new Date().getTime();
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
                // $scope.showData[counter].responseTime[0].endTime = new Date().getTime();
                $scope.showData[counter].responseTime.push({ "startTime": $scope.showData[counter].startTime, "endTime": new Date().getTime() });
                $scope.showData[counter].status = "Successfull";
                console.log("Start Time - ", $scope.showData[counter].responseTime[0].startTime);
                console.log("End Time - ", $scope.showData[counter].responseTime[0].endTime);
                console.log("Response Time - ", $scope.showData[counter].responseTime[0].endTime - $scope.showData[counter].responseTime[0].startTime);
                $scope.statusClassSuccessfull = "glyphicon glyphicon-ok text-success";
            }
            counter = counter + 1;
            if (counter < $scope.showData.length) {
                $scope.showData[counter].startTime = new Date().getTime();
                hitApi($scope.showData[counter]);
            }


        }, function errorCallback(err) {

            $scope.showData[counter].responseTime.push({ "startTime": $scope.showData[counter].startTime, "endTime": new Date().getTime() });
            $scope.showData[counter].status = "Failed";
            $scope.statusClassFailed = "glyphicon glyphicon-remove text-danger";
            counter = counter + 1;
            if (counter < $scope.showData.length) {
                $scope.showData[counter].startTime = new Date().getTime();
                hitApi($scope.showData[counter]);
            }
        });
    };


    $scope.APImetrics = {};
    $scope.APImetrics.responseMetrics = [];
    $scope.getModal = function (index) {

        $scope.APImetrics.responseMetrics = ($scope.showData[index].responseTime);

        var modalInstance = $modal.open({
            templateUrl: 'modal.html',
            controller: ModalInstanceCtrl,
            scope: $scope
        }).result.then(function () {

        }, function (res) {

        });

    };
    $scope.saveData = function () {
        $http({
            method: "POST",
            headers: { 'ContentType': 'application/json' },
            url: "/saveTestSuite",
            data: $scope.testsuite
        }).then(function successCallback(response) {
            if (response.data.stat) {
                alert("successfully saved the testSuite");
                $scope.showData=[];
            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function errorCallback(err) {
            console.log(response.data.msg);
            alert(response.data.msg);

        });
    }
    $scope.saveRequestSuite = function () {

        if ($scope.testsuite.testSuiteName == undefined) {
            var testSuiteName;
            var tempName = prompt("Please Enter Test Suite Name :", "");
            if (tempName == null || tempName == "") {
                testSuiteName = "TestSuite";
            } else {
                testSuiteName = tempName;
            }

            if (testSuiteName != "") {

                var testSuiteData = $scope.showData;
                $scope.testsuite = { "suiteName": testSuiteName, "test_suites": testSuiteData, "isScheduled": false, "frequency": "*****" };
                $scope.saveData();

            }

        } else {
            $scope.saveData();
        }

    };

    $scope.getTestSuite = function () {

        $http({
            method: "GET",
            url: "/getTestSuite",
        }).then(function successCallback(response) {
            if (response.data.stat) {
                $scope.suites = response.data.doc
            } else if (response.data.msg === "please login to create app ") {
                $window.location.href = '../views/index.html';
            }
            else {
                alert(response.data.msg);
            }
        }, function errorCallback(err) {
            console.log(response.data.msg);
            alert(response.data.msg);

        });
    };

    $scope.show = function (data) {
        $scope.showData = data.test_suites;
        $scope.hello = "spandana";

        console.log($scope.showData);
        $location.path("/testClient");
    };


}]);


// *************************


app.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
})
    .controller('MyCtrl', function (Excel, $timeout, $scope) {
        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
            $timeout(function () { location.href = exportHref; }, 100); // trigger download
        }
    });




// *************************

var ModalInstanceCtrl = function ($scope, $modalInstance) {
    // $scope.value.push([2, 19]);


    console.log("####################################");
    /*  for (var i = 0; i <= $scope.value.length; i++) {
          console.log($scope.value[i]);
          //   $scope.graphValues.push([$scope.value[i].startTime, $scope.value[i].endTime - $scope.value[i].startTime ]);
        //  console.log($scope.value[i].Object.startTime + "   " + $scope.value[i].Object.endTime - $scope.value[i].Object.startTime);
      }*/
    var responseMetricsDataSet = [];
    angular.forEach($scope.APImetrics.responseMetrics, function (responseTimeData) {
        responseMetricsDataSet.push([responseTimeData.startTime, responseTimeData.endTime - responseTimeData.startTime])
        console.log(responseMetricsDataSet);
    })

    console.log("####################################");

    $scope.exampleData = [
        {
            key: "Cumulative Return",
            values: responseMetricsDataSet /*[
                ["A", 29.765957771107],
                ["B", 56],
                ["C", 32.807804682612]

            ]*/
        }
    ];

    $scope.$on('tooltipShow.directive', function (event) {
        console.log('scope.tooltipShow', event);
    });

    $scope.$on('tooltipHide.directive', function (event) {
        console.log('scope.tooltipHide', event);
    });

};

