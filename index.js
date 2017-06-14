//const PORT=8080;
var express=require("express");
var bodyParser=require("body-parser");
var path=require("path");
var mainRouter=require("./routes/session.js");
var apiRouter=require("./routes/api.js");
// var session=require("express-session");
var mongoose=require("mongoose");
var app=express();

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/",mainRouter);
app.use("/api",apiRouter);


// app.use(session({secret:'hello',
//                     cookie: { maxAge: 50 * 1000 },
//                     proxy: true,
//                  saveUninitialized:true, 
//                  resave:true}))
// var xoauth2 = require('xoauth2');
//         var nodemailer = require('nodemailer');
//         var smtpTransport = require('nodemailer-smtp-transport');

// app.set(process.env.MAIL_URL='smtp://test.nodemailer%40gmail.com:' + encodeURIComponent("Nodemailer123") + '@smtp.gmail.com:465')

app.set("views",__dirname+"/client/views");
app.set("view engine","ejs");
app.engine("html",require("ejs").renderFile);
app.use(express.static(__dirname+"/client"));



app.listen(3900,()=>{
    console.log("sever running on port 8080");
});

module.exports = app; 