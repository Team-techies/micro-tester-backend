var express = require("express");
var path = require("path");
var session = require("express-session");
var router = express.Router();

router.use(session({
    secret: 'hello',
    saveUninitialized: true,
    resave: true
}))
var ses;

router.get("/", (req, res) => {
    res.render("index.html");
});

router.post("/checkUser", (req, res) => {
    ses = req.session;
    const mongoose = require("mongoose");
    mongoose.Promise = require("bluebird");
    var registerUsers = require('../models/registerUser.js');
    var RegisterUser = mongoose.model('registerUsers', registerUsers);
    mongoose.connect("mongodb://localhost/SampleDB").then(() => {
        console.log("spandana");
        console.log(req.body);
        var db = mongoose.connection.db;
        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }
        console.log("database connected to " + db.databaseName);
        //console.log(ses.sesId);
        var registerUser = new RegisterUser();
        RegisterUser.findOne({ "email": req.body.email, "pwd": req.body.pwd }, (err, docs) => {
            if (!err) {
                //console.log(docs);
                if (docs != null) {
                    info = {
                        stat: true,
                        usrname: docs.username
                    }
                     ses.name = docs.username;
                }

                else {
                    info = {
                        stat: false,
                        usrname: ""
                    }
                }
               
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


router.post("/createClient", (req, res) => {
    ses = req.session;
    ses.name != ""
    if (true) {
        const mongoose = require("mongoose");
        mongoose.Promise = require("bluebird");
        var createClients = require('../models/client.js');
        var CreateClient = mongoose.model('client', createClients);
        mongoose.connect("mongodb://localhost/SampleDB").then(() => {

            var db = mongoose.connection.db;
            console.log(req.body);
            // var per = {};
            // console.log(req.body);
            // for (var key in req.body) {
            //     per = JSON.parse(key);
            // }
            // // console.log("database connected to " + db.databaseName);
            // var createClient = new CreateClient({
            //     title: per.title,
            //     clientId: per.clientId,
            //     clientSecret: per.clientSecret
            // });
             var createClient = new CreateClient({
                title: req.body.title,
                clientId: req.body.clientId,
                clientSecret: req.body.clientSecret
            });
            createClient.save(function (err) {
                if (!err) {

                    db.close();
                    var info = {};
                    info = {
                        stat: true
                    }
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
    }
    else {
        info = {
            stat: false
        }
        res.send(info);
        res.end();
    }
});

router.post("/saveRequest", (req, res) => {
    ses = req.session;
    if (true) {
        const mongoose = require("mongoose");
        mongoose.Promise = require("bluebird");
        var saveRequests = require('../models/saveRequest.js');
        var SaveRequest = mongoose.model('requests', saveRequests);
        mongoose.connect("mongodb://localhost/SampleDB").then(() => {

            var db = mongoose.connection.db;
            // var per = {};
            // console.log(req.body);
            // for (var key in req.body) {
            //     per = JSON.parse(key);
            // }
            // // console.log("database connected to " + db.databaseName);
            // var saveRequest = new SaveRequest({
            //     id: per.id,
            //     method: per.method,
            //     url: per.url,
            //     header: per.header,
            //     body: per.body,
            //     status: per.status,
            //     time: per.time
            // });
            var saveRequest = new SaveRequest({
                id: req.body.id,
                method: req.body.method,
                url: req.body.url,
                header: req.body.header,
                body: req.body.body,
                status: req.body.status,
                time:req.body.time
            });
            saveRequest.save(function (err) {
                if (!err) {

                    db.close();
                    var info = {};
                    info = {
                        stat: true
                    }
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
    }
    else {
        info = {
            stat: false
        }
        res.send(info);
        res.end();
    }
});

module.exports = router;