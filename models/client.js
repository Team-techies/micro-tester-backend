var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
    title: {
        type: String,
        required:true
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
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = clientSchema;