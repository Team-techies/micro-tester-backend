const mongoose=require('mongoose');
var schedule = require('./scheduler');
module.exports={
     scheduler: (req, res) => {
        ses = req.session;

        var getTestSuites = require('../models/testSuites.js');
        var GetTestSuite = mongoose.model('testsuites', getTestSuites);
        GetTestSuite.find({ "isScheduled": true }, (err, docs) => {
            if (err) {

                 info = {
                    stat: false,
                    msg: err
                }
                console.log(err);
                //console.log(docs);
                
            } else {
                //res.json({ error: err });
               for (var i = 0; i < docs.length; i++) {
                    console.log("inside docs");
                     schedule.scheduler(docs[i]);
                }
                info = {
                    stat: true
                }
                console.log(docs);
            };
            res.send(info);
            //ses.id=docs._id;

            res.end();
        });
    }
}