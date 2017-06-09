var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var registerUserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required:true
    },
    first:{
        type: String,
        required:true
    },
    last:{
        type: String,
        required:true
    },
    empId: {
        type: String,
        min: 6,
        max: 6
    },
    pwd:{
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = registerUserSchema;
