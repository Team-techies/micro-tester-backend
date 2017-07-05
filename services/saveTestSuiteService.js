var schedule = require('./scheduler');
const mongoose = require("mongoose");
var scheduled = require('node-schedule');
module.exports={
    saveTestSuite: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(req.body);

            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);

            if (req.body._id == undefined) {
                var testSuite = new TestSuite({
                    appId: ses.app,
                    test_suites: req.body.test_suites,
                    suiteName: req.body.suiteName,
                    isScheduled: ses.isScheduled,
                    frequency: ses.frequency,
                    to: ses.to,
                    cc: ses.cc,
                    bcc: ses.bcc


                });
                testSuite.save(function (err) {
                    if (!err) {
                        info = {
                            stat: false,
                            msg: err

                        }
                        console.log(err);
                       
                        
                    }
                    else {
                        info = {
                            stat: true
                        }
                        req.body.to = ses.to;
                        req.body.cc = ses.cc;
                        req.body.bcc = ses.bcc;
                        req.body.isScheduled = ses.isScheduled;
                        req.body.frequency = ses.frequency;
                        req.body.appId = ses.app;
                        if (ses.isScheduled) {
                            schedule.scheduler(req.body);
                        }
                    }
                    res.send(info);
                    res.end();

                });
            } else {
                
                TestSuite.update({ '_id': req.body._id }, { $set: { 'test_suites': req.body.test_suites } }, function (err, doc) {
                    if (err) {
                         info = {
                            stat: false,
                            msg: err

                        }
                        
                    } else {
                       info = {
                            stat: true
                        }

                        if (req.body.isScheduled) {
                            console.log("inside update");
                            console.log(req.body.suiteName);
                            console.log(scheduled.scheduledJobs[req.body.suiteName].name);
                            scheduled.scheduledJobs[req.body.suiteName].cancel();
                            schedule.scheduler(req.body);
                        }
                    }
                    res.send(info);
                    res.end();
                })

            }
        }
        else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }
    }
    
}