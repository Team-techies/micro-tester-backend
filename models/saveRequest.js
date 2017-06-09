var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var clientSchema = new Schema({
    appId: {
        type: Number
    },
    id: {
        type: Number
    },
    method:{
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
        type: String,
        min: 6,
        max: 10
    },
    time: {
        type: Date,
        default: Date.now
    }
});
module.exports = clientSchema;