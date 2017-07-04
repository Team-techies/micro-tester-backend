const mongoose=require('mongoose');
module.exports={
     createClient: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var createClients = require('../models/client.js');
            // var AutoIncrement = require("mongoose-sequence");
            // createClients.plugin(AutoIncrement);

            var CreateClient = mongoose.model('clients', createClients);

            console.log(req.body);

            var createClient = new CreateClient({
                title: req.body.title,
                appDesc: req.body.appDesc,
                appVer: req.body.appVer,
                clientId: req.body.clientId,
                clientSecret: req.body.clientSecret,
                grantType: req.body.grantType,
                scope: req.body.scope,
                email: ses.email
            });
            createClient.save(function (err) {
                if (!err) {


                    info = {
                        stat: true,
                        status: 200,
                        msg: "Successfully created app"
                    }
                }
                else {
                    console.log(err);
                    info = {
                        stat: false,
                        status: 404,
                        msg: "failed to create app " + err
                    }

                }
                res.send(info);

                res.end();
            });
        }
        else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }
    }
}