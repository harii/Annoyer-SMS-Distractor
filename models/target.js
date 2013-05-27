var mongoose = require("mongoose");


var targetSchema = mongoose.Schema({
    name: String,
    cell: Number
});
var Target = mongoose.model('Target', targetSchema);


module.exports = Target;
