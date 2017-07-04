const mongoose = require('mongoose');
module.exports = {
    changePwd: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var registerUsers = require('../models/registerUser.js');
            var RegisterUser = mongoose.model('registerusers', registerUsers);
            console.log(req.body);


            RegisterUser.findOneAndUpdate({ 'email': ses.email, 'pwd': req.body.old }, { $set: { 'pwd': req.body.new } }).exec(function (err, docs) {
                if (!err) {

                    if (docs != null) {
                        info = {
                            stat: true,
                            msg: "you changed password successfully"
                        }
                    } else {
                        info = {
                            stat: false,
                            msg: "you have entered wrong old password"
                        }
                    }


                }
                else {
                    info = {
                        stat: false,
                        status: 404,
                        msg: "you are failed to change " + err
                    }
                    console.log(err);
                }
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
        // ses.email="spandanabola@gmail.com";

    }
}