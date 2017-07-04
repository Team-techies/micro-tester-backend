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
            if (!err) {
                //console.log(docs);
                if (docs != null) {
                    info = {
                        stat: true
                    }
                }

                else {
                    info = {
                        stat: false
                    }
                }
                console.log(docs);
                res.send(info);
                res.end();
            } else {
                //res.json({ error: err });
                res.send(err);
                res.end();
            };
        });
    }
}