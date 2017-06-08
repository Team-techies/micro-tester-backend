var express = require("express");
var router = express.Router();

// router.use(session({
//     secret: 'hello',
//     saveUninitialized: true,
//     resave: true
// }))
// var ses;
router.post("/registerUser", (req, res) => {
    ses = req.session;
    console.log("hello");
    const mongoose = require("mongoose");
    mongoose.Promise = require("bluebird");
    var registerUsers = require('../models/registerUser.js');
    var RegisterUser = mongoose.model('registerusers', registerUsers);
    mongoose.connect("mongodb://localhost/SampleDB").then(() => {

        var db = mongoose.connection.db;
        // var per = {};
        // console.log(req.body);
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }
        // // console.log("database connected to " + db.databaseName);
        // var registerUser = new RegisterUser({
        //     email: per.email,
        //     username: per.username,
        //     empId: per.empId,
        //     pwd: per.pwd
        // });
        console.log(req.body);
        var registerUser = new RegisterUser({
            email: req.body.email,
            username: req.body.username,
            empId: req.body.empId,
            pwd: req.body.pwd
        });
        registerUser.save(function (err) {
            if (!err) {

                db.close();
                var info = {};
                //console.log(user);
                info = {
                    stat: true
                }
                //console.log(user.uname);
                // ses.sesId = user.uname;
                res.send(info);
                res.end();
            }
            else {
                console.log(err);
                res.send(err);
                db.close();
                res.end();
            }
        });
    }, (err) => {
        console.log(err);
        res.send(err);
        res.end();
    });
});

router.post("/emailCheck", (req, res) => {
    const mongoose = require("mongoose");
    mongoose.Promise = require("bluebird");
    var registerUsers = require('../models/registerUser.js');
    var RegisterUser = mongoose.model('registerusers', registerUsers);
    mongoose.connect("mongodb://localhost/SampleDB").then(() => {

        var db = mongoose.connection.db;
        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }
        console.log("database connected to " + db.databaseName);
        //console.log(ses.sesId);
        var registerUser = new RegisterUser();
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
                db.close();
                res.end();
            } else {
                //res.json({ error: err });
                res.send(err);
                db.close();
                res.end();
            };
        });
    }, (err) => {
        //res.json({ error: err });
        res.send(err);
        res.end();
    });
});


module.exports = router;