var express = require("express");
var path = require("path");
var session = require("express-session");
var router = express.Router();
var service = require('../services/serviceImpl')

router.use(session({
    secret: 'hello',
    saveUninitialized: true,
    resave: true
}));
var ses;

router.get("/", (req, res) => {
    res.render("index.html");
});

router.get("/sendEmail",service.sendEmail);
router.post("/checkUser",service.checkUser);

router.get("/getClientApps", service.getClientApps);

router.get("/getApp", service.getApp);

router.get("/getClientApp/:id", service.getClientApp);

router.post("/createClient",service.createClient) 

router.post("/saveTestSuite", service.saveTestSuite);

router.get("/getTestSuite", service.getTestSuite);

router.get("/logout", service.logout);
module.exports = router;