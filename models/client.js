var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
    // _id: {
    //     type: Number
    // },
    title: {
        type: String,
        required:true
    },
    appDesc: {
        type: String,
    },
    appVer: {
        type: String,
    },
    clientId:{
        type: String,
        required:true,
        min: 6,
        max: 6
    },
    clientSecret: {
        type: String,
        min: 6,
        max: 10
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
    }
});
// }, { _id: false });
module.exports = clientSchema;