const mongoose = require('mongoose');

module.exports = {
    setPassword: (req, res) => {
        var registerUsers = require('../models/registerUser.js');
        var RegisterUser = mongoose.model('registerusers', registerUsers);


        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }


        RegisterUser.findOneAndUpdate({ "email": req.body.email }, {
            $set: {
                "pwd": req.body.pwd
            }
        }).exec((err, docs) => {
            if (err) {
                console.log("inside");
                info = {
                    stat: false,
                    msg: err
                }
                //console.log(docs);

            }
            else {
                if (docs != null) {

                    info = {
                        stat: true
                    }
                }
            }
            res.send(info);
            res.end();
        });
    }
}