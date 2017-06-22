var schedule = require('./scheduler');
const mongoose = require("mongoose");
var scheduled = require('node-schedule');
var fetch = require('node-fetch');


const httpProxyAgent = require('http-proxy-agent');
const agent = new httpProxyAgent("http://cis-india-pitc-bangalorez.proxy.corporate.ge.com:80");
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
                if (err) {

                    console.log(err);
                    info = {
                        stat: false,
                        status: 404,
                        msg: "failed to create app " + err
                    }

                }
                else {

                    info = {
                        stat: true,
                        status: 200,
                        msg: "Successfully created app"
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
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }

                } else {
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
                    //res.json({ error: err });

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
                if (err) {
                    info = {
                        stat: false,
                        msg: err
                    }
                    res.send(info);
                    //ses.id=docs._id;

                    res.end();


                } else {
                    //res.json({ error: err });
                    res.redirect("/delSuites");
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
            if (err) {
                //console.log(docs);
                info = {
                    stat: false,
                    msg: err
                }
                console.log(err);
            } else {

                for (var i = 0; i < docs.length; i++) {
                    console.log("inside docs");
                    schedule.scheduler(docs[i]);
                }
                info = {
                    stat: true
                }
                console.log(docs);
                //res.json({ error: err });

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
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }

                } else {

                    info = {
                        stat: true
                    }
                    ses.app = req.params.id;
                    //res.json({ error: err });

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
                if (err) {
                    //console.log(docs);

                    info = {
                        stat: false,
                        msg: err
                    }

                } else {

                    info = {
                        stat: true,
                        doc: docs
                    }
                    //res.json({ error: err });

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
            var suites = [];
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
            GetTestSuites.find({ 'appId': ses.app, "isScheduled": true }, (err, docs) => {
                if (err) {
                    //console.log(docs);
                    console.log(err);
                } else {

                    suites = docs;
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }


                };
                // res.send(info);
                // res.end();

            });
            GetTestSuites.remove({ "appId": ses.app }, (err) => {
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }


                } else {

                    info = {
                        stat: true
                    }
                    for (var i = 0; i < suites.length; i++) {
                        scheduled.scheduledJobs[suites[i].suiteName].cancel();
                    }
                    //res.json({ error: err });

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

            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
            GetTestSuites.findOne({ '_id': req.params.id, 'isScheduled': true }, (err, docs) => {
                if (err) {
                    //console.log(docs);
                    console.log(err);
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    if (docs != null) {
                        scheduled.scheduledJobs[docs.suiteName].cancel();
                    }


                };
                // res.send(info);
                // res.end();

            });
            GetTestSuites.remove({ "_id": req.params.id }, (err) => {
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }


                } else {

                    info = {
                        stat: true
                    }
                    //res.json({ error: err });

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
                    if (err) {

                        info = {
                            stat: false,
                            msg: err

                        }
                        console.log(err);
                    }
                    else {

                        var info = {};
                        info = {
                            stat: true
                        }
                        req.body.to = ses.to;
                        req.body.cc = ses.cc;
                        req.body.bcc = ses.bcc;
                        req.body.isScheduled = ses.schedule;
                        req.body.frequency = ses.frequency;
                        req.body.appId = ses.app;
                        if (ses.isScheduled) {
                            schedule.scheduler(req.body);
                        }

                    }
                    res.send(info);
                    res.end();

                });
            } else {

                TestSuite.update({ '_id': req.body._id }, { $set: { 'test_suites': req.body.test_suites } }, function (err, doc) {
                    if (err) {
                        info = {
                            stat: false,
                            msg: err

                        }
                    } else {

                        info = {
                            stat: true
                        }
                        if (req.body.isScheduled) {
                            scheduled.scheduledJobs[req.body.suiteName].cancel();
                            schedule.scheduler(req.body);
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
            TestSuite.findOne({ '_id': req.body._id }, (err, docs) => {
                if (err) {
                    //console.log(docs);
                    console.log(err);
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    ses.pastScheduled = docs.isScheduled;
                    ses.pastFrequency = docs.frequency;


                };
                // res.send(info);
                // res.end();

            });
            if (req.body.unScheduled) {
                status = false;
                frequency = "";

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
                if (err) {
                    info = {
                        stat: false,
                        msg: err

                    }
                } else {

                    req.body.isScheduled = status;
                    req.body.frequency = frequency;
                    info = {
                        stat: true,
                        Data: req.body
                    }
                    if (ses.pastScheduled == true && req.body.isScheduled == false) {
                        console.log("cancelled");
                        console.log(scheduled.scheduledJobs[req.body.suiteName].name);
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
                if (err) {
                    //console.log(docs);
                    console.log(err);
                } else {
                    // info = {
                    //     stat: false,
                    //     msg: err
                    // }
                    suites = docs;


                };
                // res.send(info);
                // res.end();

            });
            TestSuite.update({ 'isScheduled': false, 'appId': ses.app }, { $set: { 'isScheduled': ses.isScheduled, 'frequency': ses.frequency, 'to': ses.to, 'cc': ses.cc, 'bcc': ses.bcc } }, function (err, doc) {
                if (err) {
                    info = {
                        stat: false,
                        msg: err
                    }
                    console.log("err");
                } else {
                    console.log("success changing testsuites");
                    info = {
                        stat: true
                    }
                    for (var i = 0; i < suites.length; i++) {
                        TestSuite.findOne({ '_id': suites[i]._id }, (err, docs) => {
                            if (err) {
                                //console.log(docs);
                                console.log(err);

                            } else {
                                // info = {
                                //     stat: false,
                                //     msg: err
                                // }
                                if (docs.isScheduled) {
                                    schedule.scheduler(docs);
                                }


                            };
                            // res.send(info);
                            // res.end();

                        });
                    }

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
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }
                } else {
                    info = {
                        stat: true,
                        name: ses.name,
                        email: ses.email,
                        doc: docs
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
            if (err) {
                //console.log(docs);
                info = {
                    stat: false,
                    msg: err
                }
                res.send(info);
                res.end();
            } else {
                if (docs != null) {
                    RegisterUser.findOne({ "email": req.body.email, "pwd": req.body.pwd }, (err, docs) => {
                        if (err) {
                            //console.log(docs);
                            info = {
                                stat: false,
                                msg: err
                            }
                            res.send(info);
                            res.end();

                        } else {
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
                            //res.json({ error: err });

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
                //res.json({ error: err });

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
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }

                } else {
                    if (docs != null) {

                        info = {
                            stat: true
                        }
                    }
                    else {
                        console.log("inside");
                        info = {
                            stat: false,
                            msg: "Data is not found"
                        }
                    }
                    //res.json({ error: err });

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
            else if (req.body.frequency != undefined || req.body.frequency != "" || req.body.frequency != null) {
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
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }
                    res.send(info);
                    res.end();
                } else {
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
                            msg: "Data is not found"
                        }

                        res.send(info);
                        res.end();
                    }
                    //res.json({ error: err });


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
    tokenGenerate: (req, res) => {
        var info = {};
        ses = req.session;
        console.log(req.body);
        // ses.email=true;
        if (ses.email) {

            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);


            GetApp.findOne({ "_id": ses.app }, (err, doc) => {
                if (err) {
                    //console.log(docs);
                    info = {
                        stat: false,
                        msg: err
                    }
                    res.send(info);
                    res.end();
                } else {
                    if (doc != null) {
                        var url = 'http://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=' + doc.grantType + '&client_id=' + doc.clientId + '&client_secret=' + doc.clientSecret + '&scope=' + doc.scope;
                        console.log(url);
                        fetch(url, { method: "POST", agent: agent })
                            .then(function successCallback(response) {
                                console.log("inside success");
                                console.log(response);
                                info = {
                                    stat: true,
                                    response: response
                                }


                            })
                            .catch(function errorCallback(err) {
                                console.log(err);
                                info = {
                                    stat: false,
                                    msg: err
                                }
                            });
                        res.send(info);
                        res.end();
                    }
                    //res.json({ error: err });

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

    }

}