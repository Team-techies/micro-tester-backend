//const PORT=8080;
var express=require("express");
var bodyParser=require("body-parser");
var path=require("path");
var mainRouter=require("./routes/index.js");
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




app.set("views",__dirname+"/client/views");
app.set("view engine","ejs");
app.engine("html",require("ejs").renderFile);
app.use(express.static(__dirname+"/client"));



app.listen(8080,()=>{
    console.log("sever running on port 8080");
});