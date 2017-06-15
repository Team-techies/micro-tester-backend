var mongoose = require("mongoose");
var testCaseSchema = require("./saveRequest");
var Schema = mongoose.Schema,ObjectId = Schema.ObjectId;
var suiteSchema = new Schema({
    // _id: {
    //     type: Number
    // },
    appId: {
        type: ObjectId
    },
    test_suites: [testCaseSchema],
    date: {
        type: Date,
        default: Date.now
    },
    suiteName:{
        type:String
    }
});
// }, { _id: false });
module.exports = suiteSchema;