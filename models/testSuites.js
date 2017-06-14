var mongoose = require("mongoose");
var testCaseSchema = require("./saveRequest");
var Schema = mongoose.Schema;
var suiteSchema = new Schema({
    // _id: {
    //     type: Number
    // },
     appId: {
        type: Number
    },
test_suites : [testCaseSchema]
});
// }, { _id: false });
module.exports = suiteSchema;