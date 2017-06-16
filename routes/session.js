var express = require("express");
var path = require("path");
var session = require("express-session");
var router = express.Router();
var service = require('../services/serviceImpl')
var fetch=require('node-fetch');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var ejs = require('ejs');

router.use(session({
    secret: 'hello',
    saveUninitialized: true,
    resave: true
}));
var ses;

router.get("/", (req, res) => {
    res.render("index.html");
});

router.get("/sendEmail", service.sendEmail);
router.post("/checkUser", service.checkUser);

router.get("/scheduler", service.scheduler);

router.get("/getClientApps", service.getClientApps);

router.get("/getApp", service.getApp);
router.get("/deleteApp", service.deleteApp);
router.post("/updateApp", service.updateApp);
router.post("/configApp", service.configApp);
router.post("/configSuite", service.configSuite);

router.get("/getClientApp/:id", service.getClientApp);

router.post("/createClient", service.createClient)

router.post("/saveTestSuite", service.saveTestSuite);
router.get("/testAppChange", service.testAppChange);

router.get("/getTestSuite", service.getTestSuite);
router.get("/delSuites", service.delSuites);

router.get("/logout", service.logout);
module.exports = router;