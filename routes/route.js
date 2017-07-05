var express = require("express");
var path = require("path");
var session = require("express-session");
var RedisStore = require("connect-redis")(session)
var router = express.Router();
//var service = require('../services/serviceImpl');
var checkUserService = require('../services/checkUserService');
var schedulerService = require('../services/schedulerService');
var getClientAppsService = require('../services/getClientAppsService');
var getAppService = require('../services/getAppService');
var deleteAppService = require('../services/deleteAppService');
var updateAppService = require('../services/updateAppService');
var configAppService = require('../services/configAppService');
var configSuiteService = require('../services/configSuiteService');
var getClientAppService = require('../services/getClientAppService');
var createClientService = require('../services/createClientService');
var saveTestSuiteService = require('../services/saveTestSuiteService');
var testAppChangeService = require('../services/testAppChangeService');
var getTestSuiteService = require('../services/getTestSuiteService');
var delSuitesService = require('../services/delSuitesService');
var delSuiteService = require('../services/delSuiteService');
var logoutService = require('../services/logoutService');
var tokenGenerateService = require('../services/tokenGenerateService');
var changePwdService = require('../services/changePwdService');
var updateUserService = require('../services/updateUserService');
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
router.post("/checkUser", checkUserService.checkUser);

router.get("/scheduler", schedulerService.scheduler);

router.get("/getClientApps", getClientAppsService.getClientApps);

router.get("/getApp", getAppService.getApp);
router.get("/deleteApp", deleteAppService.deleteApp);
router.post("/updateApp", updateAppService.updateApp);
router.post("/configApp", configAppService.configApp);
router.post("/configSuite", configSuiteService.configSuite);

router.get("/getClientApp/:id", getClientAppService.getClientApp);

router.post("/createClient", createClientService.createClient)
router.post("/changePwd", changePwdService.changePwd)

router.post("/saveTestSuite", saveTestSuiteService.saveTestSuite);
router.post("/updateUser", updateUserService.updateUser);
router.get("/testAppChange", testAppChangeService.testAppChange);

router.get("/getTestSuite", getTestSuiteService.getTestSuite);
router.get("/delSuites", delSuitesService.delSuites);
router.get("/delSuite/:id", delSuiteService.delSuite);

router.get("/logout", logoutService.logout);

router.get("/tokenGenerate", tokenGenerateService.tokenGenerate);
// router.all("/test",(req,res)=>{
//     fetch(req.body.url,options).then((response)=>{
//         console.log(response); 
//         res.send(response);
//     }).catch((error)=>{
//         console.error(error)
//           res.send(error);
//     })
// })
// router.get("/success",(req,res)=>{
//     res.send({
//         status:200
//         });
// })
// router.get("/fail",(req,res)=>{
//     res.send({
//         status:500
//         });
// })
module.exports = router;