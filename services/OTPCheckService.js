const mongoose = require('mongoose');

module.exports = {
    OTPCheck: (req, res) => {
        var registerUsers = require('../models/registerUser.js');
        var RegisterUser = mongoose.model('registerusers', registerUsers);


        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }


        RegisterUser.findOne({ "email": req.body.email, "pwd": req.body.otp }, (err, docs) => {
            if (err) {
                info = {
                    stat: false,
                    msg: err
                }
                //console.log(docs);


            } else {
                //res.json({ error: err });
                var randomNum;
                if (docs != null) {
                    info = {
                        stat: true
                    }
                }

                else {
                    info = {
                        stat: false,
                        msg: "Invalid OTP"
                    }

                }

            };
            res.send(info);
            res.end();
        });
    }
}