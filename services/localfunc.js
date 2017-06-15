var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var fetch=require('node-fetch');
var handlebars = require('handlebars');
var fs = require('fs');

var ejs = require('ejs');
module.exports={
    sendMail:function(data,app){
        const mongoose = require("mongoose");
            console.log(req.params.id)
            // ses.id=1;
            var appName="";
            mongoose.Promise = require("bluebird");
            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                var db = mongoose.connection.db;
                console.log("database connected to " + db.databaseName);
                var getClientApp = new GetClientApp();
                GetClientApp.findOne({ "_id": app._id }, (err, docs) => {
                    if (!err) {
                        //console.log(docs);
                        console.log(docs.title);
                        appName=docs.title;

                    } else {
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
        var errors="---";
        for(var i=0;i<data.length;i++){
            if(data[i].status=="failed"){
                errors=errors+"----"+data[i].error
            }
        }
        console.log('SMTP Configured');
        readHTMLFile(template, function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         appname: appName,
         suitname:app.suiteName,
         error:errors
    };
    var htmlToSend = template(replacements);
     var message = {

                // sender info
                from: 'spanadana.bola@capgemini.com',

                // Comma separated list of recipients
                to: 'spanadana.bola@capgemini.com',

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

},
saveTest:function(data,app){
    const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {

                var db = mongoose.connection.db;
                 TestSuite.update({ '_id': app._id }, { $set: { 'test_suites': data} }, function (err, doc) {
                        if (!err) {
                           console.log("stored successfully");
                        } else {
                            console.log("error occured"+err);
                        }
                        db.close();
                    })}, (err) => {
               console.log("error occured"+err);
                console.log(err);
               
            });
},
hitApi :function (data,app) {

        var jsonHeader = JSON.parse(data.header);

        fetch(data.url, { method: data.selectedReqType, body: data.body, headers: jsonHeader })
        .then(function successCallback(response) {

            if (response.status === 200) {
                // $scope.showData[counter].responseTime[0].endTime = new Date().getTime();
                data[counter].responseTime.push({ "startTime": data[counter].startTime, "endTime": new Date().getTime() });
                data[counter].status = "Successfull";
                console.log("Start Time - ", data[counter].responseTime[0].startTime);
                console.log("End Time - ", data[counter].responseTime[0].endTime);
                console.log("Response Time - ", data[counter].responseTime[0].endTime - data[counter].responseTime[0].startTime);
               // $scope.statusClassSuccessfull = "glyphicon glyphicon-ok text-success";
            }
            counter = counter + 1;
            if (counter < data.length) {
                data[counter].startTime = new Date().getTime();
                this.hitApi(data[counter]);
            }else{
                //server store
                this.saveTest(data,app);

            }


        }.catch(function errorCallback(err) {

            data[counter].responseTime.push({ "startTime": data[counter].startTime, "endTime": new Date().getTime() });
            data[counter].status = "Failed";
            data[counter].error=err;
           // $scope.statusClassFailed = "glyphicon glyphicon-remove text-danger";
            counter = counter + 1;
            if (counter < data.length) {
                data[counter].startTime = new Date().getTime();
                hitApi(data[counter]);
            }else{
                
                this.saveTest(data,app);
                this.sendMail(data,app);
            }
        }));
    },

testApi :function (data,app) {
        counter = 0;

        for (let i = 0; i < data.length; i++) {
            data[i].status = "Processing";

        }
        //  $scope.showData[0].responseTime.push({"startTime":new Date().getTime(), "endTime":""});
       data[0].startTime = new Date().getTime();
        this.hitApi(data[0],app);

    },

scheduler:function(data) {
    schedule.scheduleJob(data.suiteName, data.frequency, function () {
        console.log(schedule.scheduledJobs[docs[i].suiteName]);
        this.testApi(data.test_suites,data);

    });

}
}