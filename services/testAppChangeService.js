const mongoose=require('mongoose');
var schedule = require('./scheduler');

module.exports={
       testAppChange: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(ses.frequency);
            var suites = [];
            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);
            TestSuite.find({ 'isScheduled': false, 'appId': ses.app }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    suites = docs;
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
            TestSuite.update({ 'isScheduled': false, 'appId': ses.app }, { $set: { 'isScheduled': ses.isScheduled, 'frequency': ses.frequency, 'to': ses.to, 'cc': ses.cc, 'bcc': ses.bcc } }, function (err, doc) {
                if (!err) {
                    console.log("success changing testsuites");
                    info = {
                        stat: true
                    }
                    if(ses.isScheduled){
                        for (var i = 0; i < suites.length; i++) {
                        TestSuite.findOne({'_id':suites[i]._id}, (err, docs) => {
                            if (!err) {
                                //console.log(docs);
                                schedule.scheduler(docs);
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
                    }
                    }
                    
                } else {
                    info = {
                        stat: false,
                        msg: err
                    }
                    console.log("err");
                }
                res.send(info);
                res.end();
            })


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