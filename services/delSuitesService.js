const mongoose=require('mongoose');
var scheduled = require('node-schedule');
module.exports={
    delSuites: (req, res) => {
        ses = req.session;
        if (ses.email) {
            var suites=[];
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
            GetTestSuites.find({'appId':ses.app,"isScheduled":true}, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    suites=docs;
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
            GetTestSuites.remove({ "appId": ses.app }, (err) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true
                    }
                    for(var i=0;i<suites.length;i++){
                        scheduled.scheduledJobs[suites[i].suiteName].cancel();
                    }


                } else {
                    //res.json({ error: err });
                    info = {
                        stat: false,
                        msg: err
                    }
                };
                res.send(info);
                res.end();
            });
        } else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }
        // ses.email="spandanabola@gmail.com";

    }
}