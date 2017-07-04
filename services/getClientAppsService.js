const mongoose=require('mongoose');
module.exports={
      getClientApps: (req, res) => {
        ses = req.session;
        var info = {};
        //ses.email = "spandanabola@gmail.com";
        if (ses.email) {

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);

            GetClientApp.find({ "email": ses.email }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true,
                        name: ses.name,
                        email: ses.email,
                        doc: docs
                    }
                } else {
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


    }
}