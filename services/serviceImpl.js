
var fetch = require('node-fetch');
// mongoose.Promise = require("bluebird");
// mongoose.connect("mongodb://localhost/SampleDB");
// var db = mongoose.connection.db;
module.exports = {
    
   
    
   
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
   
   
    
  tokenGenerate: (req, res) => {
        var info = {};
        var result;
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
                        var url = 'https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=' + doc.grantType + '&client_id=' + doc.clientId + '&client_secret=' + doc.clientSecret + '&scope=' + doc.scope;
                        console.log(url);
                        fetch(url, { method: "POST" })
                            .then(function successCallback(response) {
                                
                             
                                return response.json();

                            }).then(function(response){
                                 let info = {
                                    stat: true,
                                    token: response.access_token
                                }
                                res.send(info);
                                res.end();
                            })
                            .catch(function errorCallback(err) {   
                                next(err)
                            });
                        
                    }
                    //res.json({ error: err });

                };

            });
        //   schedule.tokenGenerate(ses.app,function(response){
        // console.log("at",response);
        //  res.send(response);
        // res.end();
//});
            //result=schedule.Hello();
           

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