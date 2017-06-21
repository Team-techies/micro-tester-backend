var local = require('./localfunc');
// const mongoose = require("mongoose");
// mongoose.Promise = require("bluebird");
// mongoose.connect("mongodb://localhost/SampleDB");
// var db = mongoose.connection.db;
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
                        ses.schedule = docs.isScheduled;
                        ses.frequency = docs.frequency;
                        ses.to = docs.to;
                        ses.cc = docs.cc;
                        ses.bcc = docs.bcc;
                        console.log("my app");
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
    deleteApp: (req, res) => {
        ses = req.session;
        if (ses.email) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var getClientApps = require('../models/client.js');
            var GetClientApp = mongoose.model('clients', getClientApps);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                var db = mongoose.connection.db;
                console.log("database connected to " + db.databaseName);
                var getClientApp = new GetClientApp();
                GetClientApp.findByIdAndRemove(ses.app, (err, docs) => {
                    if (!err) {
                        db.close();
                        res.redirect("/delSuites");
                        //console.log(docs);
                        // info = {
                        //     stat: true,
                        //     doc: docs,
                        //     name: ses.name,
                        //     email: ses.email
                        // }
                        // ses.schedule = false;
                        // ses.frequency = null;
                        // ses.to = null;
                        // ses.cc = null;
                        // ses.bcc = null;

                    } else {
                        //res.json({ error: err });
                        info = {
                            stat: false,
                            msg: err
                        }
                        res.send(info);
                        //ses.id=docs._id;
                        db.close();
                        res.end();
                    };

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
    scheduler: (req, res) => {
        ses = req.session;
        const mongoose = require("mongoose");
        //console.log(req.params.id)
        // ses.id=1;
        // var db = mongoose.connection.db;
        //  console.log("db show");
        //  console.log(db.databaseName);
        mongoose.Promise = require("bluebird");
        var getTestSuites = require('../models/testSuites.js');
        var GetTestSuite = mongoose.model('testsuites', getTestSuites);
        mongoose.connect("mongodb://localhost/SampleDB").then(() => {
            var db = mongoose.connection.db;
            console.log("database connected to " + db.databaseName);
            //  var getTestSuite = new GetTestSuite();
            GetTestSuite.find({ "isScheduled": true }, (err, docs) => {
                if (!err) {
                    //console.log(docs);
                    for (var i = 0; i < docs.length; i++) {
                        console.log("inside docs");
                        local.scheduler(docs[i]);
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
                db.close();
                res.end();
            });
        }, (err) => {
            //res.json({ error: err });
            info = {
                stat: false,
                msg: err
            }
            console.log(err);
            res.send(info);
            res.end();
        });

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
    getTestSuite: (req, res) => {
        ses = req.session;
        if (ses.email) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
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
                var getTestSuite = new GetTestSuites();
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
                msg: "please login to see testsuites"
            }
            res.send(info);
            res.end();
        }
        // ses.email="spandanabola@gmail.com";

    },
    delSuites: (req, res) => {
        ses = req.session;
        if (ses.email) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
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
                console.log("inside remove test suites");
                var getTestSuite = new GetTestSuites();
                GetTestSuites.remove({ "appId": ses.app }, (err) => {
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
                msg: "please login to see testsuites"
            }
            res.send(info);
            res.end();
        }
        // ses.email="spandanabola@gmail.com";

    },
    delSuite: (req, res) => {
        ses = req.session;
        if (ses.email) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var getTestSuites = require('../models/testSuites.js');
            var GetTestSuites = mongoose.model('testsuites', getTestSuites);
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
                console.log("inside remove test suites");
                var getTestSuite = new GetTestSuites();
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
                msg: "please login to see testsuites"
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
            console.log(ses.to);
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {

                var db = mongoose.connection.db;
                if (req.body._id == undefined) {
                    var testSuite = new TestSuite({
                        appId: ses.app,
                        test_suites: req.body.test_suites,
                        suiteName: req.body.suiteName,
                        isScheduled: ses.schedule,
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
                        db.close();

                    });
                } else {

                    TestSuite.update({ '_id': req.body._id }, { $set: { 'test_suites': req.body.test_suites } }, function (err, doc) {
                        if (!err) {
                            info = {
                                stat: true
                            }
                        } else {
                            info = {
                                stat: false,
                                msg: err

                            }
                        }
                        res.send(info);
                        res.end();
                        db.close();
                    })

                }

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


            }, (err) => {
                info = {
                    stat: false,
                    msg: err

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
    configSuite: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(req.body);
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                var status = false;
                var frequency = "";
                console.log("scheduler");
                console.log(req.body.unScheduled);
                if (req.body.unScheduled) {
                    status = false;
                    frequency = "";
                    console.log("cancelling scheduler");
                    // if(schedule.scheduledJobs[req.body.suiteName]){
                    //         schedule.scheduledJobs[req.body.suiteName].cancel();
                    // }

                }
                else if (req.body.frequency != undefined || req.body.frequency != "" || req.body.frequency != null) {
                    console.log("no");
                    status = true;
                    frequency = req.body.frequency;
                } else {
                    console.log("yes");
                    status = false;
                }

                var db = mongoose.connection.db;
                TestSuite.update({ '_id': req.body._id }, { $set: { 'to': req.body.to, 'cc': req.body.cc, 'bcc': req.body.bcc, 'isScheduled': status, 'frequency': frequency } }, function (err, doc) {
                    if (!err) {
                        info = {
                            stat: true,
                            Data:doc
                        }
                    } else {
                        info = {
                            stat: false,
                            msg: err

                        }
                    }
                    res.send(info);
                    res.end();
                    db.close();
                })

            }

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


                , (err) => {
                    info = {
                        stat: false,
                        msg: err

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
    testAppChange: (req, res) => {
        ses = req.session;
        // ses.id=parseInt(1);
        if (ses.email) {

            console.log(ses.frequency);
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var testSuites = require('../models/testSuites.js');
            var TestSuite = mongoose.model('testsuites', testSuites);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {

                var db = mongoose.connection.db;
                TestSuite.update({ 'isScheduled': false }, { $set: { 'isScheduled': ses.isScheduled, 'frequency': ses.frequency, 'to': ses.to, 'cc': ses.cc, 'bcc': ses.bcc } }, function (err, doc) {
                    if (!err) {
                        console.log("success changing testsuites");
                        info = {
                            stat: true
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
                    db.close();
                })

            }

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


                , (err) => {
                    info = {
                        stat: false,
                        msg: err
                    }
                    res.send(info);
                    res.end();
                    console.log(err);
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
        //  var db = mongoose.connection.db;
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
    updateApp: (req, res) => {
        var info = {};
        ses = req.session;
        console.log(req.body);
        if (ses.email) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var path = require("path");
            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                console.log("spandana");
                console.log(req.body);
                var db = mongoose.connection.db;
                console.log("database connected to " + db.databaseName);
                //console.log(ses.sesId);
                var getApp = new GetApp();
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
    configApp: (req, res) => {
        var info = {};
        ses = req.session;
        console.log(req.body);
        if (ses.email) {
            const mongoose = require("mongoose");
            mongoose.Promise = require("bluebird");
            var path = require("path");
            var getApps = require('../models/client.js');
            var GetApp = mongoose.model('clients', getApps);
            mongoose.connect("mongodb://localhost/SampleDB").then(() => {
                console.log("spandana");
                console.log(req.body);
                var db = mongoose.connection.db;
                console.log("database connected to " + db.databaseName);
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
                //console.log(ses.sesId);
                var getApp = new GetApp();
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
                                db.close();
                                ses.to = req.body.to;
                                ses.cc = req.body.cc;
                                ses.bcc = req.body.bcc;
                                ses.frequency = docs.frequency;
                                ses.isScheduled = docs.isScheduled;

                                res.redirect("/testAppChange");
                            }
                            else {
                                info = {
                                    stat: true
                                }
                                res.send(info);
                                res.end();
                                db.close();
                            }
                        }
                        else {
                            console.log("inside");
                            info = {
                                stat: false,
                                msg: err
                            }
                            db.close();
                            res.send(info);
                            res.end();
                        }
                    } else {
                        //res.json({ error: err });
                        info = {
                            stat: false,
                            msg: err
                        }
                        db.close();
                        res.send(info);
                        res.end();

                    };

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
    sendEmail: (req, res) => {
        ses = req.session;
        //var xoauth2 = require('xoauth2');
        const template = './services/email.html';
        var nodemailer = require('nodemailer');
        var handlebars = require('handlebars');
        var fs = require('fs');

        var readHTMLFile = function (template, callback) {
            fs.readFile(template, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };
        //var smtpTransport = require('nodemailer-smtp-transport');
        //process.env.MAIL_URL='smtp://:' + encodeURIComponent("Nodemailer123") + '@smtp.geips.ge.com:25';
        var transport = nodemailer.createTransport({
            host: 'smtp.geips.ge.com',
            port: 25
        });

        console.log('SMTP Configured');
        readHTMLFile(template, function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                username: "Chaithanya Bola"
            };
            var htmlToSend = template(replacements);
            var message = {

                // sender info
                from: 'spanadana.bola@capgemini.com',

                // Comma separated list of recipients
                to: 'spanadana.bola@capgemini.com',

                // Subject of the message
                subject: 'Info regarding Test suite failure',

                // plaintext body

                // HTML body
                html: `${htmlToSend}`
            };
            // ejs.renderFile(template, 'utf8', (err, html) => {
            //     if (err) console.log(err); // Handle error

            //     console.log(`HTML: ${html}`);



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
        });
        // Message object


    }
}