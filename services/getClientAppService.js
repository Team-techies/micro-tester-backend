const mongoose=require('mongoose');
module.exports={
      getClientApp: (req, res) => {
        ses = req.session;
        if (ses.email) {

            console.log(req.params.id)

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);

            GetClientApp.findOne({ "_id": req.params.id }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true
                    }
                    ses.app = req.params.id;

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