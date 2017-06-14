module.exports = {
    createClient: (req, res) => {
        ses = req.session;
        //ses.name != ""
        // ses.email = "spandanabola@gmail.com";
        if (ses.email) {
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
                    }
                    else {
                        console.log(err);
                        info = {
                            stat: false,
                            status: 404,
                            msg: "failed to create app " + err
                        }

                    }
                    res.send(info);
                    db.close();
                    res.end();
                });
            }, (err) => {
                console.log(err);
                info = {
                    stat: false,
                    msg: "failed to create app " + err
                }
                res.send(info);
                res.end();
            });
        }
        else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }
    },
    getApp: (req, res) => {
        ses = req.session;
        if (ses.email) {
            const mongoose = require("mongoose");
            console.log(req.params.id)
            // ses.id=1;
            mongoose.Promise = require("bluebird");
            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                var db = mongoose.connection.db;
                console.log("database connected to " + db.databaseName);
                var getClientApp = new GetClientApp();
                GetClientApp.findOne({ "_id": ses.app }, (err, docs) => {
                    if (!err) {
                        //console.log(docs);
                        info = {
                            stat: true,
                            doc: docs,
                            name: ses.name,
                            email: ses.email
                        }

                    } else {
                        //res.json({ error: err });
                        info = {
                            stat: false,
                            msg: err
                        }
                    };
                    res.send(info);
                    //ses.id=docs._id;
                    db.close();
                    res.end();
                });
            }, (err) => {
                //res.json({ error: err });
                info = {
                    stat: false,
                    msg: err
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

    },
    getClientApp: (req, res) => {
        ses = req.session;
        if (ses.email) {
            const mongoose = require("mongoose");
            console.log(req.params.id)
            // ses.id=1;
            mongoose.Promise = require("bluebird");
            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                var db = mongoose.connection.db;
                console.log("database connected to " + db.databaseName);
                var getClientApp = new GetClientApp();
                GetClientApp.findOne({ "_id": req.params.id }, (err, docs) => {
                    if (!err) {
                        //console.log(docs);
                        info = {
                            stat: true
                        }
                        ses.app = req.params.id;

                    } else {
                        //res.json({ error: err });
                        info = {
                            stat: false,
                            msg: err
                        }
                    };
                    res.send(info);
                    //ses.id=docs._id;
                    db.close();
                    res.end();
                });
            }, (err) => {
                //res.json({ error: err });
                info = {
                    stat: false,
                    msg: err
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
        if (ses.email) {

            console.log(req.body);
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);
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
                var testSuite = new TestSuite({
                    appId: ses.app,
                    test_suites : req.body
                });
                testSuite.save(function (err) {
                    if (!err) {

                        db.close();
                        var info = {};
                        info = {
                            stat: true
                        }
                    }
                    else {
                        info = {
                            stat: false,
                            msg:err

                        }
                        console.log(err);
                        
                        db.close();
                        
                    }
                    res.send(info);
                        res.end();
                });
            }, (err) => {
                info = {
                            stat: false,
                            msg:err

                        }
                console.log(err);
                res.send(info);
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
        if (ses.email) {
            ses.destroy();
            info = {
                stat: true,
                msg: "you logged off successfully"
            }
        }
        else {
            info = {
                stat: false,
                msg: "you are not yet logged in"
            }
        }
        res.send(info);
        res.end();
    },
    getClientApps: (req, res) => {
        ses = req.session;
        var info = {};
        //ses.email = "spandanabola@gmail.com";
        if (ses.email) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                console.log("spandana");
                // console.log(req.body);
                var db = mongoose.connection.db;
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
                    } else {
                        info = {
                            stat: false,
                            msg: err
                        }

                    };
                    res.send(info);
                    res.end();
                    db.close();
                });
            }, (err) => {
                //res.json({ error: err });
                info = {
                    stat: false,
                    msg: err
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


    },
    checkUser: (req, res) => {
        var info = {};
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
            console.log("database connected to " + db.databaseName);
            //console.log(ses.sesId);
            var registerUser = new RegisterUser();
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
                            name: ""
                        }
                    }
                } else {
                    //res.json({ error: err });
                    info = {
                        stat: false,
                        msg: err
                    }

                };
                res.send(info);
                res.end();
                db.close();
            });
        }, (err) => {
            //res.json({ error: err });
            info = {
                stat: false,
                msg: err
            }
            res.send(info);
            res.end();

        });

    },
    sendEmail: (req, res) => {
        ses = req.session;
        //var xoauth2 = require('xoauth2');
        var nodemailer = require('nodemailer');
        //var smtpTransport = require('nodemailer-smtp-transport');
        //process.env.MAIL_URL='smtp://:' + encodeURIComponent("Nodemailer123") + '@smtp.geips.ge.com:25';
        var transport = nodemailer.createTransport({
            host: 'smtp.geips.ge.com',
            port:25        
        });

                    console.log('SMTP Configured');

                    // Message object
                    var message = {

                        // sender info
                        from: 'preetham.salehundam@ge.com',

                        // Comma separated list of recipients
                        to: 'preetham.salehundam@ge.com',

                        // Subject of the message
                        subject: 'This is from node js',

                        // plaintext body
                        text: 'Hello to Lavanya!',

                        // HTML body
                        html: '<p><b>Hello</b> to Lavanya</p>' +
                        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'
                    };

                    console.log('Sending Mail');
                    transport.sendMail(message, function (error) {
                        if (error) {
                            console.log('Error occured');
                            console.log(error.message);
                            return;
                        }
                        console.log('Message sent successfully!');

                        // if you don't want to use this transport object anymore, uncomment following line
                        //transport.close(); // close the connection pool
                    });

                }
}