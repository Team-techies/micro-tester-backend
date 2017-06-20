var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var testCaseSchema = new Schema({
    appId: {
        type: Number
    },
    id: {
        type: Number
    },
    selectedReqType:{
        type: String
    },
    url: {
        type: String
    },
    header: {
        type: String
    },
   body: {
        type: String
    },
    status: {
        type: String   
    },
    startTime: {
        type: String
       
    },
    oauthFilter:{
        type: Boolean,
        default:false
    },
    responseTime: [{
        startTime:Number,
        endTime:Number
    }],
    error:[{
        time:Date,
        message:String
    }],
    success:[{
        time:Date,
        message:String
    }]
});

module.exports = testCaseSchema;