const mongoose=require('mongoose');
var scheduled = require('node-schedule');
module.exports={
    delSuite: (req, res) => {
        ses = req.session;
        if (ses.email) {
            // var suite={};
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
            GetTestSuites.findOne({"_id": req.params.id,"isScheduled":true}, (err, doc) => {
                if (!err) {
                    //console.log(docs);
                    if(doc!=null){
                         scheduled.scheduledJobs[doc.suiteName].cancel();
                    }
                    

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
            GetTestSuites.remove({ "_id": req.params.id }, (err) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true
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