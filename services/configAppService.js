const mongoose=require('mongoose');
module.exports={
     configApp: (req, res) => {
        var info = {};
        ses = req.session;
        console.log("here is config");
        console.log(req.body);
        if (ses.email) {
            var path = require("path");
            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);

            console.log(req.body);

            var status = false;
            var frequency = "";
            if (req.body.unScheduled) {
                status = false;
            }
            else if (req.body.frequency != "" || req.body.frequency != null ||req.body.frequency != undefined ) {
                status = true;
                frequency = req.body.frequency;

            }
            else {
                status = false;
            }
            GetApp.findOneAndUpdate({ "_id": req.body._id }, {
                $set: {
                    "to": req.body.to,
                    "cc": req.body.cc,
                    "bcc": req.body.bcc,
                    "frequency": frequency,
                    "isScheduled": status
                }
            }).exec((err, docs) => {
                if (!err) {
                    //console.log(docs);
                    if (docs != null) {

                        if (req.body.frequency != undefined || req.body.frequency != "" || req.body.frequency != null) {
                            ses.to = req.body.to;
                            ses.cc = req.body.cc;
                            ses.bcc = req.body.bcc;
                            ses.frequency = frequency;
                            ses.isScheduled = status;

                            res.redirect("/testAppChange");
                        }
                        else {
                            info = {
                                stat: true
                            }
                            res.send(info);
                            res.end();

                        }
                    }
                    else {
                        console.log("inside");
                        info = {
                            stat: false,
                            msg: "Data is not found"
                        }

                        res.send(info);
                        res.end();
                    }
                    //res.json({ error: err });


                }else {
                        console.log("inside");
                        info = {
                            stat: false,
                            msg: err
                        }

                        res.send(info);
                        res.end();
                    };  
                  
            });

        } else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }

    },
}