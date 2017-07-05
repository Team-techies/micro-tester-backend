const mongoose=require('mongoose');
module.exports={
     updateApp: (req, res) => {
        var info = {};
        ses = req.session;
        console.log(req.body);
        if (ses.email) {

            var path = require("path");
            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);

            console.log(req.body);

            GetApp.findOneAndUpdate({ "_id": req.body._id }, {
                $set: {
                    "title": req.body.title,
                    "appDesc": req.body.appDesc,
                    "appVer": req.body.appVer,
                    "clientId": req.body.clientId,
                    "clientSecret": req.body.clientSecret,
                    "grantType": req.body.grantType,
                    "scope": req.body.scope
                }
            }).exec((err, docs) => {
                if (err) {
                     info = {
                        stat: false,
                        msg: err
                    }
                    //console.log(docs);
                   
                } else {
                    //res.json({ error: err });
                    if (docs != null) {

                        info = {
                            stat: true
                        }
                    }
                    else {
                        console.log("inside");
                        info = {
                            stat: false,
                            msg: req.body.title+" App is not found"
                        }
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

    }
}