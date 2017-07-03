var schedule = require('./scheduler');
const mongoose = require("mongoose");
var scheduled = require('node-schedule');
// mongoose.Promise = require("bluebird");
// mongoose.connect("mongodb://localhost/SampleDB");
// var db = mongoose.connection.db;
module.exports = {
    createClient: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var createClients = require('../models/client.js');
            // var AutoIncrement = require("mongoose-sequence");
            // createClients.plugin(AutoIncrement);

            var CreateClient = mongoose.model('clients', createClients);

            console.log(req.body);

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

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            GetClientApp.findOne({ "_id": ses.app }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true,
                        doc: docs,
                        name: ses.name,
                        email: ses.email
                    }
                    ses.isScheduled = docs.isScheduled;
                    ses.frequency = docs.frequency;
                    ses.to = docs.to;
                    ses.cc = docs.cc;
                    ses.bcc = docs.bcc;
                    console.log(docs);

                } else {
                    //res.json({ error: err });
                    info = {
                        stat: false,
                        msg: err
                    }
                };
                res.send(info);
                //ses.id=docs._id;

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
    deleteApp: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            GetClientApp.findByIdAndRemove(ses.app, (err, docs) => {
                if (!err) {

                    res.redirect("/delSuites");

                } else {
                    //res.json({ error: err });
                    info = {
                        stat: false,
                        msg: err
                    }
                    res.send(info);
                    //ses.id=docs._id;

                    res.end();
                };

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
    scheduler: (req, res) => {
        ses = req.session;

        var getTestSuites = require('../models/testSuites.js');
        var GetTestSuite = mongoose.model('testsuites', getTestSuites);
        GetTestSuite.find({ "isScheduled": true }, (err, docs) => {
            if (!err) {
                //console.log(docs);
                for (var i = 0; i < docs.length; i++) {
                    console.log("inside docs");
                     schedule.scheduler(docs[i]);
                }
                info = {
                    stat: true
                }
                console.log(docs);
            } else {
                //res.json({ error: err });
                info = {
                    stat: false,
                    msg: err
                }
                console.log(err);
            };
            res.send(info);
            //ses.id=docs._id;

            res.end();
        });
    },
    getClientApp: (req, res) => {
        ses = req.session;
        if (ses.email) {

            console.log(req.params.id)

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);

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
    getTestSuite: (req, res) => {
        ses = req.session;
        if (ses.email) {

            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);

            GetTestSuites.find({ "appId": ses.app }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true,
                        doc: docs
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

    },
    delSuites: (req, res) => {
        ses = req.session;
        if (ses.email) {
            var suites=[];
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
            GetTestSuites.find({'appId':ses.app,"isScheduled":true}, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    suites=docs;
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    console.log(err);

                };
                // res.send(info);
                // res.end();

            });
            GetTestSuites.remove({ "appId": ses.app }, (err) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true
                    }
                    for(var i=0;i<suites.length;i++){
                        scheduled.scheduledJobs[suites[i].suiteName].cancel();
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

    },
    delSuite: (req, res) => {
        ses = req.session;
        if (ses.email) {
            // var suite={};
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
            GetTestSuites.findOne({"_id": req.params.id,"isScheduled":true}, (err, doc) => {
                if (!err) {
                    //console.log(docs);
                    if(doc!=null){
                         scheduled.scheduledJobs[doc.suiteName].cancel();
                    }
                    

                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    console.log(err);

                };
                // res.send(info);
                // res.end();

            });
            GetTestSuites.remove({ "_id": req.params.id }, (err) => {
                if (!err) {
                    //console.log(docs);
                    info = {
                        stat: true
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

    },
    saveTestSuite: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(req.body);

            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);

            if (req.body._id == undefined) {
                var testSuite = new TestSuite({
                    appId: ses.app,
                    test_suites: req.body.test_suites,
                    suiteName: req.body.suiteName,
                    isScheduled: ses.isScheduled,
                    frequency: ses.frequency,
                    to: ses.to,
                    cc: ses.cc,
                    bcc: ses.bcc


                });
                testSuite.save(function (err) {
                    if (!err) {

                        var info = {};
                        info = {
                            stat: true
                        }
                        req.body.to = ses.to;
                        req.body.cc = ses.cc;
                        req.body.bcc = ses.bcc;
                        req.body.isScheduled = ses.isScheduled;
                        req.body.frequency = ses.frequency;
                        req.body.appId = ses.app;
                        if (ses.isScheduled) {
                            schedule.scheduler(req.body);
                        }
                    }
                    else {
                        info = {
                            stat: false,
                            msg: err

                        }
                        console.log(err);
                    }
                    res.send(info);
                    res.end();

                });
            } else {
                
                TestSuite.update({ '_id': req.body._id }, { $set: { 'test_suites': req.body.test_suites } }, function (err, doc) {
                    if (!err) {
                        info = {
                            stat: true
                        }

                        if (req.body.isScheduled) {
                            console.log("inside update");
                            console.log(req.body.suiteName);
                            console.log(scheduled.scheduledJobs[req.body.suiteName].name);
                            scheduled.scheduledJobs[req.body.suiteName].cancel();
                            schedule.scheduler(req.body);
                        }
                    } else {
                        info = {
                            stat: false,
                            msg: err

                        }
                    }
                    res.send(info);
                    res.end();
                })

            }
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
    configSuite: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(req.body);

            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);

            var status = false;
            var frequency = "";
            console.log("scheduler");
            console.log(req.body.unScheduled);
            TestSuite.findOne({'_id':req.body._id}, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    ses.pastScheduled = docs.isScheduled;
                    ses.pastFrequency = docs.frequency;
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    console.log(err);

                };
                // res.send(info);
                // res.end();

            });
            if (req.body.unScheduled) {
                status = false;
                frequency = "";
                console.log("cancelling scheduler");

            }
            else if (req.body.frequency != undefined || req.body.frequency != "" || req.body.frequency != null) {
                console.log("no");
                status = true;
                frequency = req.body.frequency;
            } else {
                console.log("yes");
                status = false;
                frequency = "";
            }

            TestSuite.update({ '_id': req.body._id }, { $set: { 'to': req.body.to, 'cc': req.body.cc, 'bcc': req.body.bcc, 'isScheduled': status, 'frequency': frequency } }, function (err, doc) {
                if (!err) {
                    req.body.isScheduled = status;
                    req.body.frequency = frequency;
                    info = {
                        stat: true,
                        Data: req.body
                    }
                    if (ses.pastScheduled == true && req.body.isScheduled == false) {
                        scheduled.scheduledJobs[req.body.suiteName].cancel();
                    }
                    else if (ses.pastScheduled == false && req.body.isScheduled == true) {
                        schedule.scheduler(req.body);
                    }
                    else if (ses.pastScheduled == true && req.body.isScheduled == true) {
                        scheduled.scheduledJobs[req.body.suiteName].cancel();
                        schedule.scheduler(req.body);
                    } else {

                    }
                } else {
                    info = {
                        stat: false,
                        msg: err

                    }
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
    testAppChange: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(ses.frequency);
            var suites = [];
            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);
            TestSuite.find({ 'isScheduled': false, 'appId': ses.app }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    suites = docs;
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    console.log(err);

                };
                // res.send(info);
                // res.end();

            });
            TestSuite.update({ 'isScheduled': false, 'appId': ses.app }, { $set: { 'isScheduled': ses.isScheduled, 'frequency': ses.frequency, 'to': ses.to, 'cc': ses.cc, 'bcc': ses.bcc } }, function (err, doc) {
                if (!err) {
                    console.log("success changing testsuites");
                    info = {
                        stat: true
                    }
                    if(ses.isScheduled){
                        for (var i = 0; i < suites.length; i++) {
                        TestSuite.findOne({'_id':suites[i]._id}, (err, docs) => {
                            if (!err) {
                                //console.log(docs);
                                schedule.scheduler(docs);
                            } else {
                                // info = {
                                //     stat: false,
                                //     msg: err
                                // }
                                console.log(err);

                            };
                            // res.send(info);
                            // res.end();

                        });
                    }
                    }
                    
                } else {
                    info = {
                        stat: false,
                        msg: err
                    }
                    console.log("err");
                }
                res.send(info);
                res.end();
            })


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

            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);

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

    },
    updateApp: (req, res) => {
        var info = {};
        ses = req.session;
        console.log(req.body);
        if (ses.email) {

            var path = require("path");
            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);

            console.log(req.body);

            GetApp.findOneAndUpdate({ "_id": req.body._id }, {
                $set: {
                    "title": req.body.title,
                    "appDesc": req.body.appDesc,
                    "appVer": req.body.appVer,
                    "clientId": req.body.clientId,
                    "clientSecret": req.body.clientSecret,
                    "grantType": req.body.grantType,
                    "scope": req.body.scope
                }
            }).exec((err, docs) => {
                if (!err) {
                    //console.log(docs);
                    if (docs != null) {

                        info = {
                            stat: true
                        }
                    }
                    else {
                        console.log("inside");
                        info = {
                            stat: false,
                            msg: err
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
    configApp: (req, res) => {
        var info = {};
        ses = req.session;
        console.log("here is config");
        console.log(req.body);
        if (ses.email) {
            var path = require("path");
            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);

            console.log(req.body);

            var status = false;
            var frequency = "";
            if (req.body.unScheduled) {
                status = false;
            }
            else if (req.body.frequency != "" || req.body.frequency != null ||req.body.frequency != undefined ) {
                status = true;
                frequency = req.body.frequency;

            }
            else {
                status = false;
            }
            GetApp.findOneAndUpdate({ "_id": req.body._id }, {
                $set: {
                    "to": req.body.to,
                    "cc": req.body.cc,
                    "bcc": req.body.bcc,
                    "frequency": frequency,
                    "isScheduled": status
                }
            }).exec((err, docs) => {
                if (!err) {
                    //console.log(docs);
                    if (docs != null) {

                        if (req.body.frequency != undefined || req.body.frequency != "" || req.body.frequency != null) {
                            ses.to = req.body.to;
                            ses.cc = req.body.cc;
                            ses.bcc = req.body.bcc;
                            ses.frequency = frequency;
                            ses.isScheduled = status;

                            res.redirect("/testAppChange");
                        }
                        else {
                            info = {
                                stat: true
                            }
                            res.send(info);
                            res.end();

                        }
                    }
                    else {
                        console.log("inside");
                        info = {
                            stat: false,
                            msg: err
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

        } else {
            info = {
                stat: false,
                msg: "please login to create app "
            }
            res.send(info);
            res.end();
        }

    },
    // sendEmail: (req, res) => {
    //     ses = req.session;
    //     //var xoauth2 = require('xoauth2');
    //     const template = './services/email.html';
    //     var nodemailer = require('nodemailer');
    //     var handlebars = require('handlebars');
    //     var fs = require('fs');

    //     var readHTMLFile = function (template, callback) {
    //         fs.readFile(template, { encoding: 'utf-8' }, function (err, html) {
    //             if (err) {
    //                 throw err;
    //                 callback(err);
    //             }
    //             else {
    //                 callback(null, html);
    //             }
    //         });
    //     };
    //     //var smtpTransport = require('nodemailer-smtp-transport');
    //     //process.env.MAIL_URL='smtp://:' + encodeURIComponent("Nodemailer123") + '@smtp.geips.ge.com:25';
    //     var transport = nodemailer.createTransport({
    //         host: 'smtp.geips.ge.com',
    //         port: 25
    //     });

    //     console.log('SMTP Configured');
    //     readHTMLFile(template, function (err, html) {
    //         var template = handlebars.compile(html);
    //         var replacements = {
    //             username: "Chaithanya Bola"
    //         };
    //         var htmlToSend = template(replacements);
    //         var message = {

    //             // sender info
    //             from: 'spanadana.bola@capgemini.com',

    //             // Comma separated list of recipients
    //             to: 'spanadana.bola@capgemini.com',

    //             // Subject of the message
    //             subject: 'Info regarding Test suite failure',

    //             // plaintext body

    //             // HTML body
    //             html: `${htmlToSend}`
    //         };
    //         // ejs.renderFile(template, 'utf8', (err, html) => {
    //         //     if (err) console.log(err); // Handle error

    //         //     console.log(`HTML: ${html}`);



    //         console.log('Sending Mail');
    //         transport.sendMail(message, function (error) {
    //             if (error) {
    //                 console.log('Error occured');
    //                 console.log(error.message);
    //                 return;
    //             }
    //             console.log('Message sent successfully!');

    //             // if you don't want to use this transport object anymore, uncomment following line
    //             //transport.close(); // close the connection pool
    //         });
    //     });
    //     // Message object


    // }
}