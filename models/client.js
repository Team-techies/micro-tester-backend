var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
    // _id: {
    //     type: Number
    // },
    
    title: {
        type: String
    },
    appDesc: {
        type: String
    },
    appVer: {
        type: String
    },
    clientId:{
        type: String
        // required:true,
        // min: 6,
        // max: 6
    },
    clientSecret: {
        type: String
    },
    email: {
        type: String
    },
    grantType:{
        type:String
    },
    scope:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isScheduled: {
        type: Boolean,
        default: false
    },
    frequency: {
        type: String,
         default: ""
    },
    to:{
        type:String,
        default:"****@******.com"
    },
    cc:{
        type:String,
        default:"****@******.com"
    },
    bcc:{
        type:String,
        default:"****@******.com"
    }
});
// }, { _id: false });
module.exports = clientSchema;