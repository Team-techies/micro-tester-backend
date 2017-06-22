var express = require("express");
var router = express.Router();
var schedule = require('node-schedule');
const mongoose = require("mongoose");
// router.use(session({
//     secret: 'hello',
//     saveUninitialized: true,
//     resave: true
// }))
// var ses;

// router.get("/call/:id", (req, res) => {

//     var rule = new schedule.RecurrenceRule();
//     rule.minute = new schedule.Range(0, 59, 1);
//     schedule.scheduleJob(req.params.id, "*/1 * * * *", function () {
//         console.log(schedule.scheduledJobs[req.params.id]);

//     });
//     //console.log(schedule.scheduledJobs)
//     res.send(schedule.scheduledJobs[req.params.id]);

// })
router.post("/registerUser", (req, res) => {
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
                db.close();
                res.end();
            }
        });
});

router.post("/changePwd", (req, res) => {
    ses = req.session;
    console.log("hello");
    
    var registerUsers = require('../models/registerUser.js');
    var RegisterUser = mongoose.model('registerusers', registerUsers);
    console.log(req.body);
   
      
        RegisterUser.findOneAndUpdate({ 'email': ses.email, 'pwd': req.body.old }, { $set: { 'pwd': req.body.new } }).exec(function (err, docs) {
            if (!err) {

                if (docs != null) {
                    info = {
                        stat: true,
                        msg: "you changed password successfully"
                    }
                } else {
                    info = {
                        stat: false,
                        msg: "you have entered wrong old password"
                    }
                }


            }
            else {
                info = {
                    stat: false,
                    status: 404,
                    msg: "you are failed to change " + err
                }
                console.log(err);
            }
            res.send(info);
          
            res.end();
        });
});

router.post("/emailCheck", (req, res) => {
    
    var registerUsers = require('../models/registerUser.js');
    var RegisterUser = mongoose.model('registerusers', registerUsers);
   
        
        console.log(req.body);
        // var per = {};
        // for (var key in req.body) {
        //     per = JSON.parse(key);
        // }
        
        
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
                res.end();
            } else {
                //res.json({ error: err });
                res.send(err);
                res.end();
            };
        });
});


module.exports = router;