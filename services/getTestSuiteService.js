const mongoose = require('mongoose');
module.exports = {
    getTestSuite: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);

            GetTestSuites.find({ "appId": ses.app }, (err, docs) => {
                if (err) {
                    //console.log(docs);

                    info = {
                        stat: false,
                        msg: err
                    }

                } else {
                    info = {
                        stat: true,
                        doc: docs
                    }
                    //res.json({ error: err });

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