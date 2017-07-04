const mongoose=require('mongoose');
module.exports={
     getApp: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            GetClientApp.findOne({ "_id": ses.app }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true,
                        doc: docs,
                        name: ses.name,
                        email: ses.email
                    }
                    ses.isScheduled = docs.isScheduled;
                    ses.frequency = docs.frequency;
                    ses.to = docs.to;
                    ses.cc = docs.cc;
                    ses.bcc = docs.bcc;
                    console.log(docs);

                } else {
                    //res.json({ error: err });
                    info = {
                        stat: false,
                        msg: err
                    }
                };
                res.send(info);
                //ses.id=docs._id;

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