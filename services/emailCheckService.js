const mongoose = require('mongoose');
module.exports = {
    emailCheck: (req, res) => {
        var registerUsers = require('../models/registerUser.js');
        var RegisterUser = mongoose.model('registerusers', registerUsers);


        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }


        RegisterUser.findOne({ "email": req.body.email }, (err, docs) => {
            if (err) {
                //console.log(docs);
                info = {
                    stat: false,
                    msg: err
                }
            } else {
                if (docs != null) {
                    info = {
                        stat: true,
                        msg: "email already exist"
                    }
                }

                else {
                    info = {
                        stat: false
                    }
                }
                console.log(docs);

                //res.json({ error: err });

            };
            res.send(info);
            res.end();
        });
    }
}