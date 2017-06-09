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
    console.log(req.body);
    mongoose.connect("mongodb://localhost/SampleDB").then(() => {

        var db = mongoose.connection.db;
        var registerUser = new RegisterUser({
            email: req.body.email,
            first: req.body.first,
            last:req.body.last,
            empId: req.body.empId,
            pwd: req.body.pwd
        });
        registerUser.save(function (err) {
            if (!err) {

                db.close();
                var info = {};
                info = {
                    stat: true,
                    status:200,
                    msg:"you are successfully registered"
                }
                res.send(info);
                res.end();
            }
            else {
                info = {
                    stat: false,
                    status:404,
                    msg:"you are failed to register "+err
                }
                console.log(err);
                res.send(info);
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