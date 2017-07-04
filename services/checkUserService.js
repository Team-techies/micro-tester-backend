const mongoose=require('mongoose');
module.exports={
     checkUser: (req, res) => {
        var info = {};
        ses = req.session;
        var path = require("path");
        var registerUsers = require('../models/registerUser.js');
        //  var db = mongoose.connection.db;
        var RegisterUser = mongoose.model('registerUsers', registerUsers);

        console.log(req.body);
        RegisterUser.findOne({ "email": req.body.email }, (err, docs) => {
            if (!err) {
                //console.log(docs);
                if (docs != null) {
                    RegisterUser.findOne({ "email": req.body.email, "pwd": req.body.pwd }, (err, docs) => {
                        if (!err) {
                            //console.log(docs);
                            if (docs != null) {

                                ses.name = docs.first + " " + docs.last;
                                info = {
                                    stat: true,
                                    name: ses.name
                                }
                                ses.email = docs.email;
                                console.log(ses.name);
                            }
                            else {
                                console.log("inside");
                                info = {
                                    stat: false,
                                    msg: "Wrong Password!"
                                }
                            }
                            res.send(info);
                            res.end();
                        } else {
                            //res.json({ error: err });
                            info = {
                                stat: false,
                                msg: err
                            }
                            res.send(info);
                            res.end();

                        };
                        // res.send(info);
                        // res.end();
                        // db.close();
                    });
                    // ses.name = docs.first + " " + docs.last;
                    // info = {
                    //     stat: true,
                    //     name: ses.name
                    // }
                    // ses.email = docs.email;
                    // console.log(ses.name);
                }
                else {
                    info = {
                        stat: false,
                        msg: "user doesn't found"
                    }
                    res.send(info);
                    res.end();
                }
            } else {
                //res.json({ error: err });
                info = {
                    stat: false,
                    msg: err
                }
                res.send(info);
                res.end();
            };

        });

    }
}