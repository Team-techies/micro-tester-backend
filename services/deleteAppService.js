const mongoose=require('mongoose');
module.exports={
    deleteApp: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            GetClientApp.findByIdAndRemove(ses.app, (err, docs) => {
                if (err) {
                     info = {
                        stat: false,
                        msg: err
                    }
                    res.send(info);
                    //ses.id=docs._id;

                    res.end();
                  

                } else {
                    //res.json({ error: err });
                     res.redirect("/delSuites");
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

    }
}