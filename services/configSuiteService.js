var schedule = require('./scheduler');
const mongoose = require("mongoose");
var scheduled = require('node-schedule');
module.exports={
     configSuite: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(req.body);

            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);

            var status = false;
            var frequency = "";
            console.log("scheduler");
            console.log(req.body.unScheduled);
            TestSuite.findOne({'_id':req.body._id}, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    ses.pastScheduled = docs.isScheduled;
                    ses.pastFrequency = docs.frequency;
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    console.log(err);

                };
                // res.send(info);
                // res.end();

            });
            if (req.body.unScheduled) {
                status = false;
                frequency = "";
                console.log("cancelling scheduler");

            }
            else if (req.body.frequency != undefined || req.body.frequency != "" || req.body.frequency != null) {
                console.log("no");
                status = true;
                frequency = req.body.frequency;
            } else {
                console.log("yes");
                status = false;
                frequency = "";
            }

            TestSuite.update({ '_id': req.body._id }, { $set: { 'to': req.body.to, 'cc': req.body.cc, 'bcc': req.body.bcc, 'isScheduled': status, 'frequency': frequency } }, function (err, doc) {
                if (!err) {
                    req.body.isScheduled = status;
                    req.body.frequency = frequency;
                    info = {
                        stat: true,
                        Data: req.body
                    }
                    if (ses.pastScheduled == true && req.body.isScheduled == false) {
                        scheduled.scheduledJobs[req.body.suiteName].cancel();
                    }
                    else if (ses.pastScheduled == false && req.body.isScheduled == true) {
                        schedule.scheduler(req.body);
                    }
                    else if (ses.pastScheduled == true && req.body.isScheduled == true) {
                        scheduled.scheduledJobs[req.body.suiteName].cancel();
                        schedule.scheduler(req.body);
                    } else {

                    }
                } else {
                    info = {
                        stat: false,
                        msg: err

                    }
                }
                res.send(info);
                res.end();

            });
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