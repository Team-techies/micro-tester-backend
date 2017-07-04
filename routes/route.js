var express = require("express");
var path = require("path");
var session = require("express-session");
var RedisStore = require("connect-redis")(session)
var router = express.Router();
var service = require('../services/serviceImpl')
var fetch=require('node-fetch');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var ejs = require('ejs');
var http = require('http');
const httpProxyAgent = require('http-proxy-agent');
const agent = new httpProxyAgent("http://cis-india-pitc-bangalorez.proxy.corporate.ge.com:80");
// var options = {
//     method: 'GET'
//     , headers: {}        // request header. format {a:'1'} or {b:['1','2','3']}
//     , redirect: 'follow' // set to `manual` to extract redirect headers, `error` to reject redirect
//     , follow: 20         // maximum redirect count. 0 to not follow redirect
//     , timeout: 0         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
//     , compress: true     // support gzip/deflate content encoding. false to disable
//     , size: 0            // maximum response body size in bytes. 0 to disable
//     , agent: agent        // http.Agent instance, allows custom proxy, certificate etc.
// }

/*router.use(session({
    secret: 'hello',
    saveUninitialized: true,
    resave: true
}));*/


var ses;

router.get("/", (req, res) => {
    res.render("index.html");
});

// router.get("/sendEmail", service.sendEmail);
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
router.get("/delSuite/:id", service.delSuite);

router.get("/logout", service.logout);

router.get("/tokenGenerate", service.tokenGenerate);
// router.all("/test",(req,res)=>{
//     fetch(req.body.url,options).then((response)=>{
//         console.log(response); 
//         res.send(response);
//     }).catch((error)=>{
//         console.error(error)
//           res.send(error);
//     })
// })
router.get("/success",(req,res)=>{
    res.send({
        status:200
        });
})
router.get("/fail",(req,res)=>{
    res.send({
        status:500
        });
})
module.exports = router;