const mongoose = require('mongoose');
module.exports = {
    updateUser: (req, res) => {
        var info = {};
        ses = req.session;
        console.log(req.body);
        if (ses.email) {

            var path = require("path");
            var registerUsers = require('../models/registerUser.js');
            var RegisterUser = mongoose.model('registerusers', registerUsers);

            console.log(req.body);

            RegisterUser.findOneAndUpdate({ "email": req.body.email }, {
                $set: {
                    "first": req.body.first,
                    "last": req.body.last,
                    "empId": req.body.empId
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
                            msg: "User not Found"
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