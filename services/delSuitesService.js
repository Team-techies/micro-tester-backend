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
                if (err) {
                    //console.log(docs);
                    console.log(err);
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                     suites=docs;
                   

                };
                // res.send(info);
                // res.end();

            });
            GetTestSuites.remove({ "appId": ses.app }, (err) => {
                if (err) {
                    info = {
                        stat: false,
                        msg: err
                    }
                    //console.log(docs);
                   


                } else {
                    //res.json({ error: err });
                     info = {
                        stat: true
                    }
                    for(var i=0;i<suites.length;i++){
                        scheduled.scheduledJobs[suites[i].suiteName].cancel();
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