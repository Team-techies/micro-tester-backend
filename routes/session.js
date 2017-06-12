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

router.get("/dashboard", (req, res) => {
      var file=path.join(__dirname, '/../client/views/','dashboard.html');
    console.log(file);
    res.sendFile(file);
});

router.post("/checkUser",service.checkUser);

router.get("/getClientApps", service.getClientApps);

router.get("/getClientApp", service.getClientApp);

router.post("/createClient",service.createClient) 

router.post("/saveTestSuite", service.saveTestSuite);
router.get("/getRequests", service.getRequests);

router.get("/logout", service.logout);
module.exports = router;