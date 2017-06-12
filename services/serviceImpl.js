module.exports = {
    createClient: (req, res) => {
        ses = req.session;
        //ses.name != ""
        ses.email = "spandanabola@gmail.com";
        if (true) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var createClients = require('../models/client.js');
            // var AutoIncrement = require("mongoose-sequence");
            // createClients.plugin(AutoIncrement);
            var CreateClient = mongoose.model('clients', createClients);
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
                    appDesc: req.body.appDesc,
                    appVer: req.body.appVer,
                    clientId: req.body.clientId,
                    clientSecret: req.body.clientSecret,
                    grantType: req.body.grantType,
                    scope: req.body.scope,
                    email: ses.email
                });
                createClient.save(function (err) {
                    if (!err) {

                        db.close();
                        var info = {};
                        info = {
                            stat: true,
                            status: 200,
                            msg: "Successfully created app"
                        }
                        res.send(info);
                        res.end();
                    }
                    else {
                        console.log(err);
                        info = {
                            stat: false,
                            status: 404,
                            msg: "failed to create app " + err
                        }
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
        }
        else {
            info = {
                stat: false
            }
            res.send(info);
            res.end();
        }
    },
    getClientApp: (req, res) => {
        ses = req.session;
        const mongoose = require("mongoose");
        console.log(req.params.id)
        // ses.id=1;
        mongoose.Promise = require("bluebird");
        var getClientApps = require('../models/client.js');
        var GetClientApp = mongoose.model('clients', getClientApps);
        mongoose.connect("mongodb://localhost/SampleDB").then(() => {
            console.log("spandana");
            // console.log(req.body);
            var db = mongoose.connection.db;
            //  console.log(req.body);
            // var per = {};
            // for (var key in req.body) {
            //     per = JSON.parse(key);
            // }
            console.log("database connected to " + db.databaseName);
            //console.log(ses.sesId);
            var getClientApp = new GetClientApp();
            GetClientApp.findOne({ "_id": req.params.id }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    info={
                        stat:true,
                        doc:docs
                    }
                    res.send(info);
                    //ses.id=docs._id;
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
    },
    getRequests: (req, res) => {
        ses = req.session;
        // ses.email="spandanabola@gmail.com";
        const mongoose = require("mongoose");
        mongoose.Promise = require("bluebird");
        var getRequests = require('../models/client.js');
        var GetRequest = mongoose.model('requests', getRequests);
        mongoose.connect("mongodb://localhost/SampleDB").then(() => {
            console.log("spandana");
            // console.log(req.body);
            var db = mongoose.connection.db;
            //  console.log(req.body);
            // var per = {};
            // for (var key in req.body) {
            //     per = JSON.parse(key);
            // }
            console.log("database connected to " + db.databaseName);
            //console.log(ses.sesId);
            var getRequest = new GetRequest();
            GetRequest.find({ "appId": 2 }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    res.send(docs);
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
    },
    saveTestSuite: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
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
                    appId: req.body.appId,
                    id: req.body.id,
                    method: req.body.method,
                    url: req.body.url,
                    header: req.body.header,
                    body: req.body.body,
                    status: req.body.status,
                    time: req.body.time
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
    },
    logout: (req, res) => {
        ses = req.session;
        //console.log("in logout" + ses.sesId);
        if (true) {
            ses.destroy();
            info = {
                stat: true
            }
        }
        else {
            info = {
                stat: false
            }
        }
        res.send(info);
        res.end();
    },
    getClientApps: (req, res) => {
        ses = req.session;
        ses.email = "spandanabola@gmail.com";
        const mongoose = require("mongoose");
        mongoose.Promise = require("bluebird");
        var getClientApps = require('../models/client.js');
        var GetClientApp = mongoose.model('clients', getClientApps);
        mongoose.connect("mongodb://localhost/SampleDB").then(() => {
            console.log("spandana");
            // console.log(req.body);
            var db = mongoose.connection.db;
            //  console.log(req.body);
            // var per = {};
            // for (var key in req.body) {
            //     per = JSON.parse(key);
            // }
            console.log("database connected to " + db.databaseName);
            //console.log(ses.sesId);
            var getClientApp = new GetClientApp();
            GetClientApp.find({ "email": ses.email }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true,
                        name: ses.name,
                        email: ses.email,
                        doc: docs
                    }
                    res.send(info);
                    res.end();

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
    },
    checkUser: (req, res) => {
        ses = req.session;
        const mongoose = require("mongoose");
        mongoose.Promise = require("bluebird");
        var path = require("path");
        var registerUsers = require('../models/registerUser.js');
        var RegisterUser = mongoose.model('registerUsers', registerUsers);
        mongoose.connect("mongodb://localhost/SampleDB").then(() => {
            console.log("spandana");
            console.log(req.body);
            var db = mongoose.connection.db;
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
                        // info = {
                        //     stat: true,
                        //     name: docs.first+" "+docs.last
                        // }

                        res.redirect("/dashboard");
                        // res.sendFile(file);
                        ses.name = docs.first + " " + docs.last;
                        ses.email = docs.email;
                        console.log(ses.name);
                    }
                    else {
                        console.log("inside");
                        info = {
                            stat: false,
                            name: ""
                        }
                        res.send(info);
                        res.end();

                    }


                    db.close();

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
    }
}