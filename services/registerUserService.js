const mongoose = require('mongoose');
module.exports = {
    registerUser: (req, res) => {
        ses = req.session;
    console.log("hello");
    var registerUsers = require('../models/registerUser.js');
    var RegisterUser = mongoose.model('registerusers', registerUsers);
    console.log(req.body);
   
        var registerUser = new RegisterUser({
            email: req.body.email,
            first: req.body.first,
            last: req.body.last,
            empId: req.body.empId,
            pwd: req.body.pwd
        });
        registerUser.save(function (err) {
            if (!err) {

                var info = {};
                info = {
                    stat: true,
                    status: 200,
                    msg: "you are successfully registered"
                }
                res.send(info);
                res.end();
            }
            else {
                info = {
                    stat: false,
                    status: 404,
                    msg: "you are failed to register " + err
                }
                console.log(err);
                res.send(info);
                res.end();
            }
        });
    }
}