var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bots = new Schema({
    name: {type: String, trim: true, index: true, default: null, sparse: true},
    domain: {type: String, trim: true, index: true, default: null, sparse: true}
});

module.exports = Bots;
