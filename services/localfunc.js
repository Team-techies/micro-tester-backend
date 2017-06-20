var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var fetch = require('node-fetch');
var handlebars = require('handlebars');
var fs = require('fs');

var ejs = require('ejs');

function sendMail(app) {

    console.log("inside sendMail");
    const mongoose = require("mongoose");
    //console.log(req.params.id)
    // ses.id=1;
    var appName = "";
    mongoose.Promise = require("bluebird");
    var getClientApps = require('../models/client.js');
    var GetClientApp = mongoose.model('clients', getClientApps);
    mongoose.connect("mongodb://localhost/SampleDB").then(() => {
        var db = mongoose.connection.db;
        console.log("database connected to " + db.databaseName);
        var getClientApp = new GetClientApp();
        GetClientApp.findOne({ "_id": app.appId }, (err, docs) => {
            if (!err) {
                //console.log(docs);
               
                console.log(docs.title);
                appName = docs.title;
                 db.close();

            } else {
                db.close();
                //res.json({ error: err });
                console.log(err);
            }
        });
    }, (err) => {
        //res.json({ error: err });
        console.log(err);
    });
    const template = './services/email.html';

    var readHTMLFile = function (template, callback) {
        fs.readFile(template, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    //var smtpTransport = require('nodemailer-smtp-transport');
    //process.env.MAIL_URL='smtp://:' + encodeURIComponent("Nodemailer123") + '@smtp.geips.ge.com:25';
    var transport = nodemailer.createTransport({
        host: 'smtp.geips.ge.com',
        port: 25
    });
    var errors = "";
    for (var i = 0; i < app.test_suites.length; i++) {
        if (app.test_suites[i].status == "Failed") {
            errors.push({"url":app.test_suites[i].url,"message":app.test_suites[i].error[app.test_suites[i].error.length-1].message});
            //errors = errors + "****" + app.test_suites[i].url + "----" + app.test_suites[i].error
        }else{
            continue;
        }
    }
    console.log('SMTP Configured');
    readHTMLFile(template, function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            appname: appName,
            suitename: app.suiteName,
            error: errors
        };
        var htmlToSend = template(replacements);
        var message = {

            // sender info
            from: 'spanadana.bola@capgemini.com',

            // Comma separated list of recipients
            to: app.to,
            cc: app.cc,
            bcc: app.bcc,
            // Subject of the message
            subject: 'Info regarding Test suite failure',

            // plaintext body

            // HTML body
            html: `${htmlToSend}`
        };
        // ejs.renderFile(template, 'utf8', (err, html) => {
        //     if (err) console.log(err); // Handle error

        //     console.log(`HTML: ${html}`);
                console.log('Sending Mail');
                transport.sendMail(message, function (error) {
            if (error) {
                console.log('Error occured');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');

            // if you don't want to use this transport object anymore, uncomment following line
            //transport.close(); // close the connection pool
        });
       
    });
    // Message object

}

function saveTest(app) {
    const mongoose = require("mongoose");
    mongoose.Promise = require("bluebird");
    var testSuites = require('../models/testSuites.js');
    var TestSuite = mongoose.model('testsuites', testSuites);
    mongoose.connect("mongodb://localhost/SampleDB").then(() => {
        console.log("inside saveTest");
        console.log(app.test_suites);
        var db = mongoose.connection.db;
        TestSuite.update({ '_id': app._id }, { $set: { 'test_suites': app.test_suites } }, function (err, doc) {
            if (!err) {
                 db.close();
                for(var i=0;i<app.test_suites.length;i++){
                    if(app.test_suites[i].status==="Failed"){
                       
                        console.log("inside for loop");
                        sendMail(app);
                        break;
                    }
               }
                
                console.log("stored successfully");
            } else {
                db.close();
                console.log("error occured" + err);
            }
            
        })
    }, (err) => {
        console.log("error occured" + err);
        console.log(err);

    });
}

function hitApi(data, app) {

    var jsonHeader = JSON.parse(data.header);
console.log(data);
    console.log("url "+data.url);
    fetch(data.url, { method: data.selectedReqType, body: data.body, headers: jsonHeader })
        .then(function successCallback(response) {
            console.log("inside success hitapi");
            if (response.status === 200) {
                // $scope.showData[counter].responseTime[0].endTime = new Date().getTime();
                app.test_suites[counter].responseTime.push({ "startTime": app.test_suites[counter].startTime, "endTime": new Date().getTime() });
                app.test_suites[counter].status = "Successfull";
                 app.test_suites[counter].success.push({"message":"Sucessfully running"});
                console.log("Start Time - ", app.test_suites[counter].responseTime[0].startTime);
                console.log("End Time - ", app.test_suites[counter].responseTime[0].endTime);
                console.log("Response Time - ", app.test_suites[counter].responseTime[0].endTime - app.test_suites[counter].responseTime[0].startTime);
                // $scope.statusClassSuccessfull = "glyphicon glyphicon-ok text-success";
            }
            counter = counter + 1;
            if (counter < app.test_suites.length) {
                app.test_suites[counter].startTime = new Date().getTime();
               hitApi(app.test_suites[counter], app);
            } else {
                //server store
                saveTest(app);

            }


        })
        .catch(function errorCallback(err) {
             console.log("inside failure hitapi");
            app.test_suites[counter].responseTime.push({ "startTime": app.test_suites[counter].startTime, "endTime": new Date().getTime() });
            app.test_suites[counter].status = "Failed";
            app.test_suites[counter].error.push({"message":err});
            // $scope.statusClassFailed = "glyphicon glyphicon-remove text-danger";
            counter = counter + 1;
            if (counter < app.test_suites.length) {
                app.test_suites[counter].startTime = new Date().getTime();
                hitApi(app.test_suites[counter], app);
            } else {

                saveTest(app);
            }
        });
}
function testApi(data, app) {
    counter = 0;
    console.log("inside testApi");
    // for (let i = 0; i < data.length; i++) {
    //     data[i].status = "Processing";

    // }
    //  $scope.showData[0].responseTime.push({"startTime":new Date().getTime(), "endTime":""});
    data[0].startTime = new Date().getTime();
    hitApi(data[0], app);

}


module.exports = {

    scheduler: function (data) {
        console.log(data);
        console.log(data.suiteName + "started");
        schedule.scheduleJob(data.suiteName, data.frequency, function () {
            console.log(schedule.scheduledJobs[data.suiteName]);
            testApi(data.test_suites, data);

        });

    }
}