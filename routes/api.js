var express = require("express");
var router = express.Router();
var schedule = require('node-schedule');
const mongoose = require("mongoose");
var registerUserService = require('../services/registerUserService');
var emailCheckService = require('../services/emailCheckService');
var generateOTPService = require('../services/generateOTPService');
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
router.post("/registerUser",registerUserService.registerUser);

router.post("/generateOTP",generateOTPService.generateOTP);


router.post("/emailCheck", emailCheckService.emailCheck);


module.exports = router;