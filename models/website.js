var mongoose = require("mongoose");


var websiteSchema = mongoose.Schema({
    name: String,
    url: String
});
var Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
